import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { FindAllTasksUseCase } from '../../application/use-cases/find-all-tasks.use-case';
import { FindOneTaskUseCase } from '../../application/use-cases/find-one-task.use.case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../../domain/entities/task.entity';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { ApiCreateTask } from '../decorators/api-create-task.decorator';
import { ApiFindAllTasks } from '../decorators/api-find-all-tasks.decorator';
import { ApiFindOneTask } from '../decorators/api-find-one-task.decorator';

@ApiTags('Tasks')
@ApiBearerAuth()
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
  @ApiCreateTask()
  create(@CurrentUser() userId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(userId, createTaskDto);
  }

  @Get()
  @ApiFindAllTasks()
  findAll(@CurrentUser() userId: string, @Query('status') status?: TaskStatus) {
    return this.findAllTasksUseCase.execute(userId, status);
  }

  @Get(':id')
  @ApiFindOneTask()
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
  remove(@CurrentUser() userId: string, @Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id, userId);
  }
}
