import { Inject, Injectable } from '@nestjs/common';
import { TaskStatus } from '../../domain/entities/task.entity';
import { TASK_REPOSITORY } from '../../domain/repository/task.repository';
import type { TaskRepository } from '../../domain/repository/task.repository';

@Injectable()
export class FindAllTasksUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository,
  ) {}

  execute(userId: string, status?: TaskStatus) {
    return this.taskRepository.findAllByUser(userId, status);
  }
}
