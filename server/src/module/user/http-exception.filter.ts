import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';
import { ExceptionFilter, Catch, BadRequestException } from '@nestjs/common';
import {
  HttpServer,
  Inject,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
    super(applicationRef);
  }

  catch(error: Error, host: ArgumentsHost) {
    switch (error.name) {
      case 'UserNotFoundError':
        return super.catch(new BadRequestException('User not found'), host);
      case 'InvalidTokenError':
        return super.catch(new BadRequestException('Invalid token'), host);
      default:
        return super.catch(error, host);
    }
  }
}
