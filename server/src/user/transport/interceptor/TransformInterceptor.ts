import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassType<T> {
  new (): T;
}

/**
 * Transform Interceptor
 *
 * Transforms the result using the provided serializer.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(private readonly cls: ClassType<T>) {}

  /**
   * Inject interceptor
   */
  public intercept(
    _context: ExecutionContext,
    call$: Observable<Partial<T>>,
  ): Observable<T> {
    return call$.pipe(map(data => plainToClass(this.cls, data)));
  }
}
