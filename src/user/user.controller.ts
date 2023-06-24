import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserService }  from './user.service';

import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser: newUser
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async getAll(@Res() response) {
    try {
      const data = await this.userService.getAll();

      return response.status(HttpStatus.OK).json({
        users: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.userService.getOne(id);

      return response.status(HttpStatus.OK).json({
        user: existing
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not found!',
        error: 'Bad Request'
      });
    }
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto) {
    try {
      const existing = await this.userService.update(id, updateUserDto);

      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleted = await this.userService.delete(id);

      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        user: deleted,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}