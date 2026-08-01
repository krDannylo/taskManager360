import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../users/domain/repositories/user.repository';
import type { UserRepository } from '../../../users/domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) throw new InvalidCredentialsError();

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
