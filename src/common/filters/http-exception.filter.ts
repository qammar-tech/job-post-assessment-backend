import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponseBody {
  success: false;
  statusCode: number;
  errors?: string[];
  message?: string;
}

/**
 * Global exception filter that transforms all HttpExceptions — including
 * ValidationPipe errors — into a consistent response envelope.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const body = this.buildResponseBody(statusCode, exceptionResponse);
    response.status(statusCode).json(body);
  }

  private buildResponseBody(
    statusCode: number,
    exceptionResponse: string | object,
  ): ErrorResponseBody {
    if (typeof exceptionResponse === 'string') {
      return { success: false, statusCode, message: exceptionResponse };
    }

    const responseObj = exceptionResponse as Record<string, unknown>;
    const rawMessage = responseObj['message'];

    if (Array.isArray(rawMessage)) {
      return { success: false, statusCode, errors: rawMessage as string[] };
    }

    return {
      success: false,
      statusCode,
      message: (rawMessage as string) ?? HttpStatus[statusCode],
    };
  }
}
