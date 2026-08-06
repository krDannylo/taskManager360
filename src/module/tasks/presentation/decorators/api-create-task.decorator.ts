import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateTask() {
  return applyDecorators(
    ApiOperation({
      summary: 'Criar uma nova tarefa',
      description: 'Cria uma nova tarefa associada ao usuário autenticado.',
    }),

    ApiResponse({
      status: 201,
      description: 'Tarefa criada com sucesso.',
    }),

    ApiResponse({
      status: 401,
      description: 'Usuário não autenticado.',
    }),
  );
}
