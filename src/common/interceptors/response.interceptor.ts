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
        // You can customize the error response format here
        const response = context.switchToHttp().getResponse();
        const status = response.statusCode || err.status || 500;

        if (err instanceof HttpException){
          return throwError(() => ({
            statusCode: status,
            message: err.message || 'An error occurred',
            error: err.getResponse(),
            data: null,
          }))
        } else {
          return throwError(() => ({
            statusCode: status,
            message: 'Internal server error',
            error: err.message,
            data: null,
          }));
        }
      }),
    );
  }
}
