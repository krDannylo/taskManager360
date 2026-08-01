import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';

@Module({
  providers: [
    PrismaUserRepository,
    { provide: USER_REPOSITORY, useExisting: PrismaUserRepository },
    CreateUserUseCase,
  ],
  exports: [USER_REPOSITORY, CreateUserUseCase],
})
export class UsersModule {}
