import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestUser } from '../../auth/auth.guard';
import { Request, Response } from 'express';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | RequestUser>();
    const response = contextHttp.getResponse<Response>();
    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);

    const timeStart = Date.now();
    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(`Rota Acessada pelo User: ${request.user.sub}`);
        }
        const timeEnd = Date.now() - timeStart;
        this.logger.log(`Response: status: ${statusCode} - time: ${timeEnd}`);
      }),
    );
  }
}
