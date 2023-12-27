import { PartialType } from '@nestjs/mapped-types';
import { CreateTodolistDto } from './create-todolist.dto';

export class UpdateTodolistDto extends PartialType(CreateTodolistDto) {
  readonly active: boolean;
  readonly todo: string;
  readonly priority?: number;
  readonly type?: string;
  readonly image: {
    image: string;
    name: string;
  };
  readonly status?: number;
  readonly deletestatus?: boolean;
}
