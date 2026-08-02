import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'Email utilizado para autenticação',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password99example',
    description: 'Senha cadastrada pelo usuário',
  })
  @IsString()
  password: string;
}