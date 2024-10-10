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
    const resUser = await this.usersService.fillterAttributesUser(user);

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
    const resUser = await this.usersService.fillterAttributesUser(user);
    return {
      user: resUser,
      token,
    };
  }

  async logout(token: string): Promise<LogoutResDto> {
    const decodedToken = this.jwtService.decode(token) as { exp: number };

    if (!decodedToken || !decodedToken.exp) {
      throw new UnauthorizedException('Invalid token');
    }

    const ttl = decodedToken.exp - Math.floor(Date.now() / 1000);

    await this.redis.set(`blacklist:${token}`, 'true', 'EX', ttl);
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

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const isBlacklisted = await this.redis.get(`blacklist:${token}`);
    return !!isBlacklisted;
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
        status: 1,
      });

      return updateUser;
    } catch (err) {
      return { status: 500, message: err, success: false };
    }
  }
}
