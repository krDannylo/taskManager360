import { Task, TaskStatus } from '../entities/task.entity';

export interface TaskRepository {
  create(data: {
    title: string;
    description?: string;
    status: TaskStatus;
    userId: string;
  }): Promise<Task>;
  findAllByUser(userId: string, status?: TaskStatus): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(
    id: string,
    data: Partial<{ title: string; description: string; status: TaskStatus }>,
  ): Promise<Task>;
  delete(id: string): Promise<void>;
}

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');
