import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { UpdateTeacherDto } from './dto/update-teacher.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma:PrismaService){}
  async СreateTeacher(payload: CreateTeacherDto) {
    let existTeacher=await this.prisma.teacher.findMany({
      where:{
        phone:payload.phone
      }
    })
    if(existTeacher.length){
      throw new ConflictException("Teacher allready exist by phone")
    }
    await this.prisma.teacher.create({
      data:payload
    })
    return{
      success:true,
      message:"Teacher created"
    }
  }

  async GetAllTeachers() {
    let teachers=await this.prisma.teacher.findMany()

    return {
      success:true,
      data:teachers
    }
  }
  async GetTeacherOneId(teacherId:number){
    let teacher=await this.prisma.teacher.findMany({
      where:{
        id:teacherId
      }
    })
    if(!teacher){
      throw new NotFoundException("Teacher not found by id")
    }
    return {
      success:true,
      data:teacher
    }
  }

  async UpdateTeacher(teacherId: number, payload: UpdateTeacherDto) {
    let existTeacher= await this.prisma.teacher.findFirst({
      where:{
        id:teacherId
      }
    })
    if(!existTeacher){
      throw new NotFoundException("Teacher not found by teacherId")
    }
    let data:Record<string,number|string>={}
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
    if(payload.experience){
      data.experience=payload.experience
    }
    await this.prisma.teacher.update({
      where:{
        id:teacherId
      },
      data:data
    })
    return{
      access:true,
      message:"Teacher updated"
    }
  }

  async DeleteTeacher(teacherId: number) {
    let existTeacher=await this.prisma.teacher.findMany({
      where:{
        id:teacherId
      }
    })
    if(!existTeacher){
      throw new NotFoundException("Teacher not found by userId")
    }
    await this.prisma.teacher.delete({
      where:{
        id:teacherId
      }
    })
    return{
      success:true,
      message:"User deleted"
    }
  }
}
