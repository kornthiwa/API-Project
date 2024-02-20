import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async create(@Body() createLoginDto: CreateLoginDto) {
    console.log(createLoginDto);
    try {
      let login;
      // Check if the username already exists
      const existingLogin = await this.loginService.findByUsername(
        createLoginDto.username,
      );

      if (existingLogin) {
        // If the username exists, attempt to login and check the password
        login = await this.loginService.login(
          createLoginDto.username,
          createLoginDto.password,
        );
        if (!login) {
          throw new HttpException(
            { message: 'Incorrect password' },
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        // If the username doesn't exist, create a new login
        login = await this.loginService.create(createLoginDto);
      }

      return login;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to create or login' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.loginService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to retrieve all logins' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
