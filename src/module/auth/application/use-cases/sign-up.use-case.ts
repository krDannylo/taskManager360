import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../../../users/application/use-cases/create-user.use-case';
import { SignUpDto } from '../../presentation/dto/sign-up.dto';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  execute(dto: SignUpDto) {
    return this.createUserUseCase.execute(dto);
  }
}
