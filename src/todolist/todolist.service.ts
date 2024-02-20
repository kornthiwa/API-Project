import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todolist } from './schemas/todolist.schemas';
import mongoose from 'mongoose';

interface FindAllResult {
  todos: Todolist[];
  testcount: number;
}
@Injectable()
export class TodolistService {
  constructor(
    @InjectModel(Todolist.name)
    private todoModel: mongoose.Model<Todolist>,
  ) {}

  async findAll(): Promise<FindAllResult> {
    try {
      const todos = await this.todoModel.find({
        deletestatus: false,
      });

      const testcount = await this.todoModel.countDocuments({
        deletestatus: false,
      });
      console.log('Test Count:', testcount);
      return { todos, testcount };
    } catch (error) {
      console.error('An error occurred:', error.message);
      throw new Error('Failed to fetch todos');
    }
  }

  async findByCondition(todoName: string): Promise<Todolist[]> {
    try {
      const regex = new RegExp(todoName, 'i');
      const todos = await this.todoModel.find({ todo: regex });
      return todos;
    } catch (error) {
      console.error('An error occurred:', error.message);
      throw new Error('Failed to fetch todos');
    }
  }

  async findById(id: string): Promise<Todolist> {
    try {
      const res = await this.todoModel.findById(id);
      return res;
    } catch (error) {
      console.error('An error occurred:', error.message);
      throw new Error('Failed to fetch todo by ID');
    }
  }

  async create(todoData: Todolist): Promise<Todolist> {
    try {
      const { active, todo, priority, type, status, image } = todoData;

      const createUser: Todolist = {
        active,
        todo,
        priority,
        type,
        image,
        status,
      };

      const createdTodo = await this.todoModel.create(createUser);
      return createdTodo;
    } catch (error) {
      console.error('Error creating todo:', error.message);
      throw new Error('Failed to create todo');
    }
  }

  async update(id: string, todoData: Todolist): Promise<Todolist> {
    try {
      const { active, todo, priority, type, status, image, deletestatus } =
        todoData;

      const updateData: Todolist = {
        active,
        todo,
        priority,
        type,
        image,
        status,
        deletestatus,
      };

      const updatedTodo = await this.todoModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true },
      );

      if (!updatedTodo) {
        throw new Error(`Todo with id ${id} not found`);
      }
      console.log(updateData);
      return updatedTodo;
    } catch (error) {
      console.error('An error occurred:', error.message);
      throw new Error('Failed to update todo');
    }
  }

  async sorfdelete(id: string): Promise<Todolist> {
    console.log(id);

    try {
      const todo = await this.todoModel.findById(id);

      if (!todo) {
        throw new Error(`Todo with id ${id} not found`);
      }

      await this.todoModel.updateOne({ _id: todo._id }, { deletestatus: true });

      return todo;
    } catch (error) {
      console.error('An error occurred:', error.message);
      throw new Error('Failed to update todo');
    }
  }
}
