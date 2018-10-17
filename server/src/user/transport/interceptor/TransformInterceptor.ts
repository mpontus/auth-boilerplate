import { ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface ClassType<T> {
  new (...args: any[]): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(private readonly cls: ClassType<T>) {}

  public intercept(_context: ExecutionContext, call$: Observable<T>) {
    return call$.pipe(map((data) => plainToClass(this.cls, data)));
  }
}
