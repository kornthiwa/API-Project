import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CatDocument = HydratedDocument<Todolist>;

@Schema()
export class Todolist {
  @Prop({ type: Boolean, required: true })
  active!: boolean;

  @Prop({ type: String, required: true })
  todo!: string;

  @Prop({ type: Date, default: Date.now, required: false })
  createdat?: Date;

  @Prop({ type: String, default: Date.now, required: false })
  updatedat?: Date;

  @Prop({ type: Number, required: false })
  priority?: number;

  @Prop({ type: String, required: false })
  type?: string;

  @Prop({
    //ทำให้ไม่มีID
    _id: false,
    type: {
      image: String,
      name: String,
    },
    required: false,
  })
  image: {
    image: string;
    name: string;
  };

  @Prop({ type: Number, required: false })
  status?: number;

  @Prop({ type: Boolean, default: false, required: false })
  deletestatus?: boolean;
}

export const TodolistSchema = SchemaFactory.createForClass(Todolist);
