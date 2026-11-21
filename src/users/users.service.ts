import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Update } from 'vite/types/hmrPayload.js';
import { UpdateUserDto } from './dto/update.users.dto.js';
import { CreateUserDto } from './dto/create.users.dto.js';
import { addAbortListener } from 'events';

@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}
    async GetUsers(){
        let users=await this.prisma.user.findMany()
        return {
            success:true,
            data:users
        }
    }
    async GetUsersOneId(userId:number){
        let user=await this.prisma.user.findMany({
            where:{
                id:userId
            }
        })
        if(!user){
            throw new NotFoundException("User not found by id")
        }
        return {
            success:true,
            data:user
        }
    }
    
    async CreateUser(payload:CreateUserDto){
        let existUser=await this.prisma.user.findUnique({
            where:{
                phone:payload.phone
            }
        })
        if(existUser){
            throw new ConflictException('User already exists by phone')
        }
        await this.prisma.user.create({
            data:payload
        })
        return{
            success:true,
            message:"User created"
        }
    }
    async UpdateUser(userId:number,payload:UpdateUserDto){
        let existUser=await this.prisma.user.findFirst({
            where:{
                id:userId
            }
        })
        if(!existUser){
            throw new NotFoundException("User not found by userId")
        }
        let data:Record<string,string|number>={}
        if(payload.fullname){
            data.fullname=payload.fullname
        }
        if(payload.phone){
            data.phone=payload.phone
        }
        if(payload.age){
            data.age=payload.age
        }
        if(payload.password){
            data.password=payload.password
        }
        await this.prisma.user.update({
            where:{
                id:userId
            },
            data:data
        })
        return{
            success:true,
            message:"User updated"
        }
    }
    async DeleteUser(userId:number){
        let existUser=await this.prisma.user.findMany({
            where:{
                id:userId
            }
        })
        if(!existUser){
            throw new NotFoundException("User not found by userId")
        }
        await this.prisma.user.delete({
            where:{
                id:userId
            }
        })
        return {
            success:true,
            message:"User deleted"
        }
    }
}
