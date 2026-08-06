import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TaskStatus } from '../../domain/entities/task.entity';

export function ApiFindAllTasks() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar tarefas',
      description:
        'Retorna todas as tarefas pertencentes ao usuário autenticado.',
    }),

    ApiQuery({
      name: 'status',
      required: false,
      enum: TaskStatus,
      description: 'Filtra tarefas pelo status informado.',
    }),

    ApiResponse({
      status: 200,
      description: 'Lista de tarefas retornada com sucesso.',
    }),

    ApiResponse({
      status: 401,
      description: 'Usuário não autenticado.',
    }),
  );
}
