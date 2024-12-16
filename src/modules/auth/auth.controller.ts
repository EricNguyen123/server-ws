import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-guards/local-auth.guard';
import { ChangePasswordDto } from 'src/dto/change-password.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login.dto';
import { LoginResDto } from 'src/dto/login-res.dto';
import { LogoutResDto } from 'src/dto/logout-res.dto';
import { LogoutDto } from 'src/dto/logout.dto';
import { ChangePasswordResDto } from 'src/dto/change-password-res.dto';
import { UserResDto } from 'src/dto/user-res.dto';
import { VerifyMailDto } from 'src/dto/verify-mail.dto';
import { VerifyMailResDto } from 'src/dto/verify-mail-res.dto';
import { envs } from 'src/config/envs';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from './guards/roles/roles.guard';
import { JwtAuthGuard } from './guards/jwt-guards/jwt-auth.guard';
import { OTPtoEmailDto } from 'src/dto/OTPtoEmail.dto';
import { OTPtoEmailResDto } from 'src/dto/OTPtoEmail-res.dto';
import { VerifyOTPResDto } from 'src/dto/verifyOTP-res.dto';
import { VerifyOTPDto } from 'src/dto/verifyOTP.dto';
import { ChangeForgotPasswordDto } from 'src/dto/change-forgot-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: UserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully login',
    type: LoginResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.loginWithGoogle({
      email: req.user.email,
    });

    const token = encodeURIComponent(response.token);
    const email = encodeURIComponent(response.user.email);
    res.redirect(`${envs.feUrl}/en?token=${token}&email=${email}`);
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully login',
    type: LoginResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('callback/login')
  async callbackLogin(@Body() data) {
    return await this.authService.loginWithGoogle({ email: data.email });
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully logout',
    type: LogoutResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return await this.authService.logout(logoutDto.token);
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully change password',
    type: ChangePasswordResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('update/password')
  updatePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Verify email successfully',
    type: VerifyMailResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get('verify')
  async verifyMail(@Query() verifyMailDto: VerifyMailDto, @Res() res) {
    await this.authService.verifyMail(verifyMailDto);
    res.redirect(`${envs.feUrl}`);
  }

  @ApiResponse({
    status: 201,
    description: 'Req OTP successfully',
    type: OTPtoEmailResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('otp')
  reqOTPtoEmail(@Body() data: OTPtoEmailDto) {
    return this.authService.sendOtpToEmail(data.email);
  }

  @ApiResponse({
    status: 201,
    description: 'verify OTP successfully',
    type: VerifyOTPResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('otp/verify')
  verifyOTP(@Body() data: VerifyOTPDto) {
    return this.authService.verifyOTP(data.otp, data.email);
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully change password',
    type: ChangePasswordResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('update/forgot_password')
  updateForgotPassword(
    @Body() changeForgotPasswordDto: ChangeForgotPasswordDto,
  ) {
    return this.authService.changeForgotPassword(changeForgotPasswordDto);
  }
}
