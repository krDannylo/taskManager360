export enum TaskStatus {
  PENDING = 'PENDING',
  WIP = 'WIP',
  DONE = 'DONE',
}

export class Task {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly status: TaskStatus,
    public readonly userId: string,
    public readonly createdAt: Date,
  ) {}
}
