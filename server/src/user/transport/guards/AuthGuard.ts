import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionService } from '../../data/service/SessionService';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SessionService) private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.headers || !req.headers.authorization) {
      return false;
    }

    const [schema, credentials, ...rest] = req.headers.authorization.split(' ');

    if (!/^Bearer$/i.test(schema) || rest.length > 0) {
      return false;
    }

    const user = await this.sessionService.authenticate(credentials);

    if (!user) {
      return false;
    }

    req.user = user;

    return true;
  }
}
