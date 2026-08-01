import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { FindAllTasksUseCase } from './application/use-cases/find-all-tasks.use-case';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { FindOneTaskUseCase } from './application/use-cases/find-one-task.use.case';
import { PrismaTaskRepository } from './infrastructure/persistence/prisma-task.repository';
import { TASK_REPOSITORY } from './domain/repository/task.repository';
import { TasksController } from './presentation/controllers/task.controller';

@Module({
  providers: [
    PrismaTaskRepository,
    { provide: TASK_REPOSITORY, useExisting: PrismaTaskRepository },
    CreateTaskUseCase,
    FindAllTasksUseCase,
    FindOneTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
  ],
  controllers: [TasksController],
})
export class TasksModule {}
