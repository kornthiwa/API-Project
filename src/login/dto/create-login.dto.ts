import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail() // Ensure email format
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;
}