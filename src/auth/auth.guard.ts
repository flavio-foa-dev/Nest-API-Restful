import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    console.log('tokeneeeeee', token);
    if (!token) throw new UnauthorizedException('Error autentication');
    return true;
  }
  private getToken(request: Request): string | undefined {
    const [type, payload] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? payload : undefined;
  }
}
