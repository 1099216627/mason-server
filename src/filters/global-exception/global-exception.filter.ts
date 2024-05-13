import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { AllExceptionsFilter } from '../all-exceptions/all-exceptions.filter';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpExceptionFilter: HttpExceptionFilter,
    private readonly allExceptionsFilter: AllExceptionsFilter,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return this.httpExceptionFilter.catch(exception, host);
    }
    return this.allExceptionsFilter.catch(exception, host);
  }
}
