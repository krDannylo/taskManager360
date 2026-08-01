import { Task as PrismaTask } from '@prisma/client';
import { Task, TaskStatus } from '../../../domain/entities/task.entity';

export class TaskMapper {
  static toDomain(raw: PrismaTask): Task {
    return new Task(
      raw.id,
      raw.title,
      raw.description,
      raw.status as TaskStatus,
      raw.userId,
      raw.createdAt,
    );
  }
}
