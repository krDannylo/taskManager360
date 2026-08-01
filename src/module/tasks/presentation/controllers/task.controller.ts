import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { FindAllTasksUseCase } from '../../application/use-cases/find-all-tasks.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../../domain/entities/task.entity';
import { FindOneTaskUseCase } from '../../application/use-cases/find-one-task.use.case';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly findOneTaskUseCase: FindOneTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  create(@CurrentUser() userId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(userId, createTaskDto);
  }

  @Get()
  findAll(@CurrentUser() userId: string, @Query('status') status?: TaskStatus) {
    return this.findAllTasksUseCase.execute(userId, status);
  }

  @Get(':id')
  findOne(@CurrentUser() userId: string, @Param('id') id: string) {
    return this.findOneTaskUseCase.execute(id, userId);
  }

  @Patch(':id')
  update(
    @CurrentUser() userId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.updateTaskUseCase.execute(id, userId, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@CurrentUser() userId: string, @Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id, userId);
  }
}
