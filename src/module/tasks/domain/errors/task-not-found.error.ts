import { DomainError } from '../../../../shared/errors/domain.error';

export class TaskNotFoundError extends DomainError {
  readonly statusCode = 404;

  constructor(id: string) {
    super(`Tarefa "${id}" não encontrada.`);
  }
}
