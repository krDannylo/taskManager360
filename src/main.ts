import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DomainExceptionFilter } from './shared/filters/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // exceptionFactory: () => {
      //   return new AppException({
      //     code: RequestErrorCode.INVALID_REQUEST_FORMAT,
      //     message: RequestErrorMessages.INVALID_REQUEST_FORMAT,
      //     status: 400,
      //   });
      // },
    }),
    //new SanitizePipe(),
  );

  app.useGlobalFilters(new DomainExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
