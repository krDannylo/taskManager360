import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY } from '../../domain/repository/task.repository';
import type { TaskRepository } from '../../domain/repository/task.repository';
import { TaskNotFoundError } from '../../domain/errors/task-not-found.error';
import { ForbiddenTaskAccessError } from '../../domain/errors/forbidden-task-access.error';
import { UpdateTaskDto } from '../../presentation/dto/update-task.dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository,
  ) {}

  async execute(taskId: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) throw new TaskNotFoundError(taskId);
    if (task.userId !== userId) throw new ForbiddenTaskAccessError();

    return this.taskRepository.update(taskId, dto);
  }
}
