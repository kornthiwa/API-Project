import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodolistSchema, Todolist } from './schemas/todolist.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todolist.name, schema: TodolistSchema },
    ]),
  ],
  controllers: [TodolistController],
  providers: [TodolistService],
})
export class TodolistModule {}
