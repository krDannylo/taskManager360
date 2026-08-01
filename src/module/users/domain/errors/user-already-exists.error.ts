import { DomainError } from '../../../../shared/errors/domain.error';

export class UserAlreadyExistsError extends DomainError {
  readonly statusCode = 409;

  constructor(email: string) {
    super(`Email Inválido`);
  }
}
