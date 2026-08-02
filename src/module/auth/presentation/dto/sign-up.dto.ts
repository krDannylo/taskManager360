import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'Name Example',
    description: 'Nome completo do usuário',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'email@email.com',
    description: 'Email utilizado para login',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password99example',
    description: 'Senha do usuário (mínimo de 8 caracteres)',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}