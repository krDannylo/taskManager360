import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiFindOneTask() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar tarefa por ID',
      description:
        'Retorna uma tarefa específica pertencente ao usuário autenticado.',
    }),

    ApiParam({
      name: 'id',
      description: 'Identificador único da tarefa',
      example: '000e0000-e00b-00d0-a000-000000000000',
    }),

    ApiResponse({
      status: 200,
      description: 'Tarefa encontrada com sucesso.',
    }),

    ApiResponse({
      status: 404,
      description: 'Tarefa não encontrada.',
    }),

    ApiResponse({
      status: 403,
      description: 'Usuário não possui acesso a esta tarefa.',
    }),
  );
}
