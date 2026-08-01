import { Inject, Injectable } from '@nestjs/common';
import { TaskStatus } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../../presentation/dto/create-task.dto';
import { TASK_REPOSITORY } from '../../domain/repository/task.repository';
import type { TaskRepository } from '../../domain/repository/task.repository';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository,
  ) {}

  execute(userId: string, dto: CreateTaskDto) {
    return this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      status: dto.status ?? TaskStatus.PENDING,
      userId,
    });
  }
}
