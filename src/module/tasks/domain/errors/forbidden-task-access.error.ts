import { DomainError } from '../../../../shared/errors/domain.error';

export class ForbiddenTaskAccessError extends DomainError {
  readonly statusCode = 403;

  constructor() {
    super('Você não tem permissão para realizar essa operaçção!');
  }
}
