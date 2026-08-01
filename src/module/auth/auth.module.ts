import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: process.env.JWT_SECRET, //! config.get<string>('JWT_SECRET')
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  providers: [SignUpUseCase, SignInUseCase, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
