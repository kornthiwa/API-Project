import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodolistModule } from './todolist/todolist.module';
import { MongodbModule } from './mongodb/mongodb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongodbModule,
    TodolistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
