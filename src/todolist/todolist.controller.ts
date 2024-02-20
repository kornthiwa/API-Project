import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { Todolist } from './schemas/todolist.schemas';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
interface FindAllResult {
  todos: Todolist[];
  testcount?: number;
}
@Controller('todolist')
export class TodolistController {
  constructor(private todolistService: TodolistService) {}

  @Get(':id')
  async getByIdtodolist(@Param('id') id: string): Promise<Todolist> {
    return this.todolistService.findById(id);
  }

  @Get()
  async getTodolist(
    @Query('todo') todoName?: string,
  ): Promise<Todolist[] | FindAllResult> {
    if (todoName) {
      const todos = await this.todolistService.findByCondition(todoName);
      return todos;
    } else {
      const result = await this.todolistService.findAll();
      return { testcount: result.testcount, todos: result.todos };
    }
  }

  @Post()
  async createtodo(
    @Body()
    todoData: CreateTodolistDto,
  ): Promise<Todolist> {
    console.log(todoData);
    return this.todolistService.create(todoData);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodo: UpdateTodolistDto,
  ): Promise<Todolist> {
    try {
      console.log(id);

      if (id) {
        const updatedTodo = await this.todolistService.update(id, updateTodo);
        return updatedTodo;
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      throw new Error('Failed to update todo');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      console.log(id);

      if (id) {
        const deleteTodo = await this.todolistService.sorfdelete(id);
        return deleteTodo;
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
}
