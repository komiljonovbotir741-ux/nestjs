import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create.users.dto.js';
import { Update } from 'vite/types/hmrPayload.js';
import { UpdateUserDto } from './dto/update.users.dto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Get('all')
    async getUsers(){
       return await this.usersService.GetUsers()
    }
    @Post()
    async CreateUser(@Body() payload:CreateUserDto){
        return await this.usersService.CreateUser(payload)
    }
    @Put(':userId')
    async UpdateUser(@Param('userId') userId:number,@Body() payload:UpdateUserDto){
        return await this.usersService.UpdateUser(userId,payload)
    }
    @Delete(':userId')
    async DeleteUser(@Param('userId') userId:number){
        return await this.usersService.DeleteUser(userId)
    }
}
