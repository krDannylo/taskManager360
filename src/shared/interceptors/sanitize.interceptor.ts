import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      request.body = this.sanitize(request.body);
    }

    if (request.query) {
      this.sanitizeObject(request.query);
    }

    if (request.params) {
      this.sanitizeObject(request.params);
    }

    return next.handle();
  }

  private sanitizeObject(
    target: Record<string, unknown>,
  ): void {
    Object.keys(target).forEach((key) => {
      target[key] = this.sanitize(target[key]);
    });
  }

  private sanitize(value: unknown): unknown {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value === 'string') {
      return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      });
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.sanitize(item));
    }

    if (typeof value === 'object') {
      const sanitizedObject: Record<string, unknown> = {};

      Object.entries(value as Record<string, unknown>).forEach(
        ([key, val]) => {
          sanitizedObject[key] = this.sanitize(val);
        },
      );

      return sanitizedObject;
    }

    return value;
  }
}