import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { envValidationSchema } from './shared/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
