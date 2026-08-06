import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { ApiSignIn } from '../decorators/api-sign-in.decorator';
import { ApiSignUp } from '../decorators/api-sign-up.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('signUp')
  @ApiSignUp()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Post('signIn')
  @ApiSignIn()
  signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto.email, signInDto.password);
  }
}
