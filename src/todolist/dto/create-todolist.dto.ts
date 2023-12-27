export class CreateTodolistDto {
  readonly todo: string;
  readonly active: boolean;
  readonly priority: number;
  readonly type: string;
  readonly image: {
    image: string;
    name: string;
  };
  readonly status: number;
  readonly deletestatus: boolean;
}
