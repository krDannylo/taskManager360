import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

export function ApiSignUp() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),

    ApiOperation({
      summary: 'Registrar um novo usuário',
      description: 'Cria um novo usuário utilizando nome, email e senha.',
    }),

    ApiOkResponse({
      description: 'Usuário autenticado com sucesso.',
    }),

    ApiResponse({
      status: 409,
      description: 'Usuário já cadastrado.',
    }),

    ApiResponse({
      status: 400,
      description: 'Dados enviados inválidos.',
    }),
  );
}
