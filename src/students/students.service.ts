import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma:PrismaService){}

  async CreateStudent(payload: CreateStudentDto) {
    let existStudent=await this.prisma.student.findUnique({
      where:{
        phone:payload.phone
      }
    })
    if(existStudent){
      throw new ConflictException('Student already exist by phone')
    }
    await this.prisma.student.create({
      data:payload
    })
    return{
      success:true,
      message:"Student created"
    }
  }

  async GetAllStudents() {
    let students=await this.prisma.student.findMany()

    return {
      success:true,
      data:students
    }
  }
  async GetStudentOneId(studentId:number){
    let student=await this.prisma.student.findMany({
      where:{
        id:studentId
      }
    })
    if(!student){
      throw new NotFoundException("Student not found by id")
    }
    return {
      success:true,
      data:student
    }
  }

  async UpdateStudent(studentId: number, payload: UpdateStudentDto) {
    let existStudent=await this.prisma.student.findFirst({
      where:{
        id:studentId
      }
    })
    if(!existStudent){
      throw new NotFoundException('Student not found by studentId')
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
    await this.prisma.student.update({
      where:{
        id:studentId
      },
      data:data
    })
  }

  async DeleteStudent(studentId: number) {
    let existStudent=await this.prisma.student.findFirst({
      where:{
        id:studentId
      }
    })
    if(!existStudent){
      throw new NotFoundException('Student not found by studentId')
    }
    await this.prisma.student.delete({
      where:{
        id:studentId
      }
    })
  }
}
