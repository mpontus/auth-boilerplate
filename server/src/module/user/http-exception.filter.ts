import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';
import { ExceptionFilter, Catch, BadRequestException } from '@nestjs/common';
import {
  HttpServer,
  Inject,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { ValidationError } from './domain/exception/ValidationError';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
    super(applicationRef);
  }

  catch(error: Error, host: ArgumentsHost) {
    return super.catch(this.mapError(error), host);
  }

  private mapError(error: Error) {
    switch (error.name) {
      case 'UserNotFoundError':
        return new BadRequestException('User not found');
      case 'InvalidTokenError':
        return new BadRequestException('Invalid token');
      case 'UserAlreadyExistsError':
        return new BadRequestException('User already exists');
      case 'ValidationError':
        if (error instanceof ValidationError) {
          return new BadRequestException(error.fields, 'Validation error');
        }

        return error;

      default:
        return error;
    }
  }
}
