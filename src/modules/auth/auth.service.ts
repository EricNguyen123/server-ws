import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/dto/register.dto';
import { GoogleDto } from 'src/dto/google.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { ChangePasswordDto } from 'src/dto/change-password.dto';
import { LoginResDto } from 'src/dto/login-res.dto';
import { LogoutResDto } from 'src/dto/logout-res.dto';
import { ChangePasswordResDto } from 'src/dto/change-password-res.dto';
import { envs } from 'src/config/envs';
import { VerifyMailDto } from 'src/dto/verify-mail.dto';
import { MailerService } from '../mailer/mailer.service';
import { Status } from 'src/common/enums/status.enum';
import { generateNumericOtp } from 'src/utils/otp.util';
import { ChangeForgotPasswordDto } from 'src/dto/change-forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailerService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { password, name, email } = registerDto;
    const user = await this.usersService.create({
      name: name,
      email: email,
      encrypted_password: bcrypt.hashSync(password, envs.bcryptSaltRound),
    });
    if (!user) {
      throw new UnauthorizedException('Created fail');
    }

    bcrypt.hash(email, envs.bcryptSaltRound).then((hashedEmail) => {
      this.mailService.sendMail({
        from: { name: envs.appName, address: envs.mailFromAddress },
        recipients: [{ name: name, address: email }],
        subject: 'Welcome to WebShop',
        html: `
        <p>
          <strong>Hi ${name}!</strong>
          <a href="${envs.appUrl}/auth/verify?email=${email}&token=${hashedEmail}"> Verify </a>
        </p>`,
      });
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<LoginResDto> {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credentials not valid');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.encrypted_password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!user.status) {
      throw new UnauthorizedException('User is not active');
    }

    const token = this.getJwtToken(user.id);
    await this.setBlacklistToken(user.id, token);
    const updateUser = await this.updateToken(user.id, token);
    const resUser = await this.usersService.fillterAttributesUser(updateUser);

    return {
      user: resUser,
      token,
    };
  }

  async loginWithGoogle({ email }: { email: string }): Promise<LoginResDto> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credentials not valid');
    }
    const token = this.getJwtToken(user.id);
    await this.setBlacklistToken(user.id, token);
    const updateUser = await this.updateToken(user.id, token);
    const resUser = await this.usersService.fillterAttributesUser(updateUser);
    return {
      user: resUser,
      token,
    };
  }

  async logout(token: string): Promise<LogoutResDto> {
    const checkToken = await this.isTokenBlacklisted(token);

    const user = await this.usersService.findOneByTokens(token);

    if (!user && !checkToken) {
      throw new UnauthorizedException('User not found');
    }

    if (!checkToken) {
      await this.setBlacklistToken(user?.id, token);
    }

    const data = await this.getDataInBlackList(token);
    const userId = user ? user?.id : data.userId;
    const updateUser = await this.usersService.updateUser(userId, {
      tokens: null,
      last_sign_in_at: new Date(),
    });
    if (!updateUser) {
      throw new UnauthorizedException('Update user fail');
    }

    return { status: 200, message: 'Logout successful' };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<ChangePasswordResDto> {
    const { id, currentPassword, password } = changePasswordDto;

    const user = await this.usersService.updatePassword(
      id,
      currentPassword,
      password,
    );

    return {
      user,
    };
  }

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async validateUser(id: string): Promise<UserEntity> {
    const user = await this.usersService.findOneById(id);

    delete user.encrypted_password;

    return user;
  }

  async validateCheckUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.encrypted_password))) {
      delete user.encrypted_password;

      return user;
    }
    return null;
  }

  async validateGoogleUser(googleUser: GoogleDto) {
    const user = await this.usersService.findOneByEmail(googleUser.email);
    if (user) return user;
    const randomPassword = this.generateRandomPassword(10);
    googleUser.encrypted_password = bcrypt.hashSync(
      randomPassword,
      envs.bcryptSaltRound,
    );
    return await this.usersService.create(googleUser);
  }

  async getCurrentToken(id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new UnauthorizedException('User not found');
    const token = user.tokens;
    return token;
  }

  async updateToken(id: string, token: string) {
    const updateUser = await this.usersService.updateUser(id, {
      tokens: token,
      current_sign_in_at: new Date(),
    });
    return updateUser;
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const isBlacklisted = await this.redis.get(`blacklist:${token}`);
    return !!isBlacklisted;
  }

  async getDataInBlackList(
    token: string,
  ): Promise<{ userId: string; token: string }> {
    const data = await this.redis.get(`blacklist:${token}`);
    if (!data) throw new UnauthorizedException('Token not found');
    return JSON.parse(data) as { userId: string; token: string };
  }

  async setBlacklistToken(userId: string, token: string) {
    const decodedToken = this.jwtService.decode(token) as { exp: number };

    if (!decodedToken || !decodedToken.exp) {
      throw new UnauthorizedException('Invalid token');
    }
    const ttl = decodedToken.exp - Math.floor(Date.now() / 1000);

    await this.redis.set(
      `blacklist:${token}`,
      JSON.stringify({ userId, token }),
      'EX',
      ttl,
    );
  }

  generateRandomPassword(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  async verifyMail(verifyMailDto: VerifyMailDto) {
    const { email, token } = verifyMailDto;

    try {
      const isValidToken = await bcrypt.compare(email, token);

      if (!isValidToken) {
        return { status: 404, message: 'Not found.', success: false };
      }

      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        return { status: 404, message: 'User not found.', success: false };
      }

      const updateUser = await this.usersService.updateUser(user.id, {
        status: Status.Active,
      });

      return updateUser;
    } catch (err) {
      return { status: 500, message: err, success: false };
    }
  }

  async generateOtp(userId: string, size = envs.otpSize) {
    const key = `reqOtp:${userId}`;
    const ttl = await this.redis.ttl(key);

    if (ttl === -2) {
      const pattern = `resOtp:*`;
      const keys = await this.redis.keys(pattern);
      const otpCount = keys.filter(async (otpKey) => {
        const data = await this.redis.get(otpKey);
        const parsed = JSON.parse(data);
        return parsed.userId === userId;
      }).length;

      if (otpCount > envs.otpLimit) {
        const timeLimit = envs.otpTimeLimit;
        await this.redis.set(key, '', 'EX', timeLimit);
        return {
          otp: null,
          hashedToken: null,
          timeOut: null,
          timeLine: timeLimit,
        };
      }

      const otp = generateNumericOtp(size);
      const hashedToken = bcrypt.hashSync(otp, envs.bcryptSaltRound);
      const initTTL = envs.otpTimeout;
      await this.redis.set(
        `resOtp:${hashedToken}`,
        JSON.stringify({ userId, hashedToken }),
        'EX',
        initTTL,
      );
      const ttlOtp = await this.redis.ttl(`resOtp:${hashedToken}`);
      return {
        otp: otp,
        hashedToken: hashedToken,
        timeOut: ttlOtp,
        timeLine: null,
      };
    } else if (ttl === -1) {
      await this.redis.del(key);
    } else {
      return { otp: null, hashedToken: null, timeOut: null, timeLine: ttl };
    }
  }

  async sendOtpToEmail(email: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return {
        status: 404,
        timeOut: undefined,
        timeLine: undefined,
        message: 'Invalid email address',
      };
    }

    const otp = await this.generateOtp(user.id);

    if (otp.otp) {
      const updateUser = await this.usersService.updateUser(user.id, {
        tokens: otp.hashedToken,
      });
      if (!updateUser) {
        return {
          status: 405,
          timeOut: undefined,
          timeLine: undefined,
          message: 'Invalid otp token',
        };
      }
      this.mailService.sendMail({
        from: { name: envs.appName, address: envs.mailFromAddress },
        recipients: [{ name: user.name, address: email }],
        subject: 'Welcome to WebShop',
        html: `
        <p>
          <strong>Hi ${user.name}!</strong>
          <span>Your OTP is <strong>${otp.otp}</strong>. <br/> Your verification code is valid for ${envs.otpTimeout / 60} minutes. Never share your OTP with anyone.</span>
        </p>`,
      });
    } else {
      return {
        status: 201,
        timeOut: undefined,
        timeLine: otp.timeLine,
        message: 'Failed to send OTP to your email',
      };
    }

    return {
      status: 200,
      timeOut: otp.timeOut,
      timeLine: undefined,
      message: 'Success send OTP to your email',
    };
  }

  async verifyOTP(otp: string, email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid otp');
    }
    const checkOTP = await this.redis.get(`resOtp:${user.tokens}`);
    if (!checkOTP) {
      await this.usersService.updateUser(user.id, {
        tokens: null,
      });
      return {
        status: 402,
        userId: undefined,
        message: 'OTP Expired',
      };
    }
    const verify = await bcrypt.compare(otp, user.tokens);
    if (!verify) {
      return {
        status: 401,
        userId: undefined,
        message: 'Invalid OTP',
      };
    }
    await this.usersService.updateUser(user.id, {
      tokens: null,
    });
    return {
      status: 200,
      message: 'OTP verified successfully',
      userId: user.id,
    };
  }

  async changeForgotPassword(
    changeForgotPasswordDto: ChangeForgotPasswordDto,
  ): Promise<ChangePasswordResDto> {
    const { id, password } = changeForgotPasswordDto;

    const user = await this.usersService.updateForgotPassword(id, password);

    return {
      user,
    };
  }
}
