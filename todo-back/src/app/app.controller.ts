import {
  Body,
  Controller,
  Get, HttpCode, HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe, Post,
  Query
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateTodoDtoBack,
  GetTodoDto,
  getTodoSchema,
  ListTodoDto
} from '@full-stack-app-article/api-contract';
import { ZodError } from 'zod';

@Controller('todos')
export class AppController {
  todos:GetTodoDto[] = []
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodo(
    @Body() createTodoDto: CreateTodoDtoBack,
  ): Promise<{ todoId: string }> {
    const todo = {
      id:(this.todos.length +1).toString(), ...createTodoDto
    } as const satisfies GetTodoDto
    this.todos.push(todo)

    return {
      todoId:todo.id,
    };

  }

  @Get(':id')
  async getTodo(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<GetTodoDto> {
    const todo = {
      id: id,
      title: 'test',
      description: 'test description',
      dueDate: new Date().getDate().toString(),
      status: 'pending',
    } as const satisfies GetTodoDto;
    console.log("aaa")
    // Validation de la réponse avec Zod
    try {
      return getTodoSchema.parse(todo); // Valide et retourne le todo
    } catch (e) {
      if (e instanceof ZodError) {
        throw new Error(`Invalid response format: ${e.message}`);
      }
      throw e;
    }
  }

  // Route pour obtenir une liste de todos
  @Get()
  async listTodos(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10
  ): Promise<ListTodoDto> {


    try {
      return {
        todos:this.todos,
        page,
        limit,
        total: this.todos.length,
      } as const satisfies ListTodoDto;
    } catch (e) {
      if (e instanceof ZodError) {
        throw new Error(`Invalid response format: ${e.message}`);
      }
      throw e;
    }
  }
}
