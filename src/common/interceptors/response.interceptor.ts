import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: 'Success',
        error: null,
        data
      })),
      catchError((err) => {
        const response = context.switchToHttp().getResponse();
        let status = 500;
        let message = 'Internal server error';
        let error = err.message;

        if (err instanceof HttpException) {
          status = err.getStatus();
          message = err.message;
          error = err.getResponse();
        }

        response.status(status);  // Set the correct status code

        return throwError(() => ({
          statusCode: status,
          message: message,
          error: error,
          data: null,
        }));
      }),
    );
  }
}
