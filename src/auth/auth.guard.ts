import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from 'src/types/user-payload.type';

export interface RequestUser extends Request {
  user: UserPayload;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestUser>();
    const token = this.getToken(request);

    if (!token) throw new UnauthorizedException('Error autentication');
    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('token invalid');
    }
    return true;
  }
  private getToken(request: Request): string | undefined {
    const [type, payload] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? payload : undefined;
  }
}
