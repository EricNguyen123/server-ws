import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private authService: AuthService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request = this.getRequest(context);

    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const payload = this.jwtService.verify(token);

      this.authService
        .getDataInBlackList(token)
        .then((data) => {
          if (
            data.userId !== user.id ||
            (payload.exp && Date.now() >= payload.exp * 1000)
          ) {
            this.authService.logout(token);
            throw new UnauthorizedException('Token expired');
          }
          const currentToken = this.authService.getCurrentToken(user.id);
          if (currentToken !== token)
            return (user = this.authService.updateToken(user.id, token));
        })
        .catch((error) => {
          throw new UnauthorizedException(error.message || 'Invalid token');
        });

      // if (payload.exp && Date.now() >= payload.exp * 1000) {
      //   this.authService.logout(token);
      //   throw new UnauthorizedException('Token expired');
      // }

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid token');
    }
  }
}
