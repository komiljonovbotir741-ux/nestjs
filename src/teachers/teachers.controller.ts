import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { TeachersService } from './teachers.service.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { UpdateTeacherDto } from './dto/update-teacher.dto.js';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  СreateTeacher(@Body() payload: CreateTeacherDto) {
    return this.teachersService.СreateTeacher(payload);
  }

  @Get('all')
  GetAllTeachers() {
    return this.teachersService.GetAllTeachers();
  }
  @Get(':teacherId')
  GetTeacherOneId(@Param(':teacherId',ParseIntPipe) teacherId:number){
    return this.teachersService.GetTeacherOneId(teacherId)
  }

  @Put(':teacherId')
  UpdateTeacher(@Param('teacherId',ParseIntPipe) teacherId: number, @Body() payload: UpdateTeacherDto) {
    return this.teachersService.UpdateTeacher(teacherId, payload);
  }

  @Delete(':teacherId')
  DeleteTeacher(@Param('teacherId',ParseIntPipe) teacherId:number) {
    return this.teachersService.DeleteTeacher(teacherId);
  }
}
