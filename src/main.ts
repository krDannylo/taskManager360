import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DomainExceptionFilter } from './shared/filters/domain-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
  .setTitle('TaskManager360 API')
  .setDescription('Documentação da API do TaskManager360')
  .setVersion('1.0')
  .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'JWT-auth',
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
