import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar um novo usuário',
    description:
      'Cria um novo usuário utilizando nome, email e senha.',
  })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário já cadastrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados enviados inválidos.',
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Autenticar usuário',
    description:
      'Realiza a autenticação do usuário e retorna um token JWT.',
  })
  @ApiOkResponse({
    description: 'Usuário autenticado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha inválidos.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados enviados inválidos.',
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto.email, signInDto.password);
  }
}
