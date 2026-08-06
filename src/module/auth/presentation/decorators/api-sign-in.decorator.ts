import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

export function ApiSignIn() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),

    ApiOperation({
      summary: 'Autenticar usuário',
      description: 'Realiza a autenticação do usuário e retorna um token JWT.',
    }),

    ApiOkResponse({
      description: 'Usuário autenticado com sucesso.',
    }),

    ApiResponse({
      status: 400,
      description: 'Dados enviados inválidos.',
    }),

    ApiResponse({
      status: 401,
      description: 'Email ou senha inválidos.',
    }),
  );
}
