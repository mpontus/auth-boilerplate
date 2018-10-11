import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';
import {
  Catch,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpServer, Inject, ArgumentsHost } from '@nestjs/common';

@Catch()
export class DebugExceptionFilter extends BaseExceptionFilter {
  constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
    super(applicationRef);
  }

  catch(error: Error, host: ArgumentsHost) {
    console.error(error);

    return super.catch(error, host);
  }
}
