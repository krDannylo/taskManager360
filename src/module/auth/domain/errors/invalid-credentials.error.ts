import { DomainError } from '../../../../shared/errors/domain.error';

export class InvalidCredentialsError extends DomainError {
  readonly statusCode = 401;

  constructor() {
    super('Email ou senha inválidos');
  }
}
