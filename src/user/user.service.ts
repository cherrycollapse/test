import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { IUser } from './user.interface';

import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User')
  private userModel: Model<IUser>) { }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existing = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!existing) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existing;
  }

  async getAll(): Promise<IUser[]> {
    const data = await this.userModel.find();

    if (!data || data.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return data;
  }

  async getOne(id: string): Promise<IUser> {
    const existing = await this.userModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existing;
  }

  async delete(id: string): Promise<IUser> {
    const deleted = await this.userModel.findByIdAndDelete({_id: id.trim() });

    if (!deleted) throw new NotFoundException('User does not exist');
    return deleted;
  }


}
