import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  InternalServerErrorException, BadGatewayException
} from "@nestjs/common";
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data,
      })),
      catchError((error) => {
        return throwError(
          new BadGatewayException({
            status: 'fail',
            data: error.message,
          }),
        );
      }),
    );
  }
}
