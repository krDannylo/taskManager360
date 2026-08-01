import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { TaskMapper } from './mappers/task.mapper';
import { TaskRepository } from '../../domain/repository/task.repository';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    title: string;
    description?: string;
    status: TaskStatus;
    userId: string;
  }): Promise<Task> {
    const raw = await this.prisma.task.create({ data });
    return TaskMapper.toDomain(raw);
  }

  async findAllByUser(userId: string, status?: TaskStatus): Promise<Task[]> {
    const raws = await this.prisma.task.findMany({
      where: { userId, ...(status && { status }) },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map(TaskMapper.toDomain);
  }

  async findById(id: string): Promise<Task | null> {
    const raw = await this.prisma.task.findUnique({ where: { id } });
    return raw ? TaskMapper.toDomain(raw) : null;
  }

  async update(
    id: string,
    data: Partial<{ title: string; description: string; status: TaskStatus }>,
  ): Promise<Task> {
    const raw = await this.prisma.task.update({ where: { id }, data });
    return TaskMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
