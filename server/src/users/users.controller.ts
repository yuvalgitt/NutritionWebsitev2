import { Body, Controller, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import mongoose from "mongoose";
import { User } from './users.schema';
import { PatchUserDto } from './dto/patchUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){}

    @Post()
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Post('login')
    async handleLogin(@Body() logInObj : {username : string , password : string} ) : Promise<User | boolean>{
        const array =  await this.userService.handleLoginRequest(logInObj.username,logInObj.password)
        const target = array[0]
        
        return target ? target : false
    }

    @Get()
    getUsers(){
        return this.userService.getUsers()
    }

    @Get(':id')
    getUserById(@Param('id') id : string) {
        if(!mongoose.Types.ObjectId.isValid(id))
            throw new HttpException('invalid id' , 400)
        return this.userService.getUserById(id)
    }

    @Patch(':id')
    patchUser(@Param('id') id : string , @Body() patchUserDto : PatchUserDto ){
        if(!mongoose.Types.ObjectId.isValid(id))
            throw new HttpException('invalid id',400)
        return this.userService.patchUser(id,patchUserDto)
    }
}
