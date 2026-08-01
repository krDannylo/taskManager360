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
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto.email, signInDto.password);
  }
}
