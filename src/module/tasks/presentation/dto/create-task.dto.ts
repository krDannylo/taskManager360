import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../domain/entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Título da tarefa',
    description: 'Título da tarefa',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Descrição da Tarefa',
    description: 'Descrição da tarefa',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: TaskStatus.PENDING,
    enum: TaskStatus,
    description: 'Status inicial da tarefa',
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
