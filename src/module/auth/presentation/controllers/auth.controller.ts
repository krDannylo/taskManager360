import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('signUp')
  signUp(@Body() dto: SignUpDto) {
    return this.signUpUseCase.execute(dto);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    return this.signInUseCase.execute(dto.email, dto.password);
  }
}
