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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiOperation({
    summary: 'Criar uma nova tarefa',
    description:
      'Cria uma nova tarefa associada ao usuário autenticado.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
  })
  create(
    @CurrentUser() userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.createTaskUseCase.execute(userId, createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar tarefas',
    description:
      'Retorna todas as tarefas pertencentes ao usuário autenticado. É possível filtrar pelo status.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
    description: 'Filtra tarefas pelo status informado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
  })
  findAll(
    @CurrentUser() userId: string,
    @Query('status') status?: TaskStatus,
  ) {
    return this.findAllTasksUseCase.execute(userId, status);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar tarefa por ID',
    description:
      'Retorna uma tarefa específica pertencente ao usuário autenticado.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único da tarefa',
    example: '000e0000-e00b-00d0-a000-000000000000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada.',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não possui acesso a esta tarefa.',
  })
  findOne(
    @CurrentUser() userId: string,
    @Param('id') id: string,
  ) {
    return this.findOneTaskUseCase.execute(id, userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar uma tarefa',
    description:
      'Atualiza os dados de uma tarefa pertencente ao usuário autenticado.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único da tarefa',
    example: '000e0000-e00b-00d0-a000-000000000000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada.',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não possui acesso a esta tarefa.',
  })
  update(
    @CurrentUser() userId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.updateTaskUseCase.execute(
      id,
      userId,
      updateTaskDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Excluir uma tarefa',
    description:
      'Remove uma tarefa pertencente ao usuário autenticado.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único da tarefa',
    example: '000e0000-e00b-00d0-a000-000000000000',
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada.',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não possui acesso a esta tarefa.',
  })
  remove(
    @CurrentUser() userId: string,
    @Param('id') id: string,
  ) {
    return this.deleteTaskUseCase.execute(id, userId);
  }
}