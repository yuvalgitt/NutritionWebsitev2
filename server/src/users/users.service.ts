import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { PatchUserDto } from './dto/patchUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    try {

      newUser.save();
      return `new user created : ${newUser.username}`
    }
    catch (error) {
      return error
    }
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  getUserByUsername(username: string) {
    return this.userModel.find({ username: username });
  }

  handleLoginRequest(username: string, password: string){
    return  this.userModel.find({ username : username, password: password });
  }

  patchUser(id : string,patchUserDto : PatchUserDto){
    return this.userModel.findByIdAndUpdate(id,patchUserDto,{new : true})
  }
}
