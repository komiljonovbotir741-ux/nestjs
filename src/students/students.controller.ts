import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  CreateStudent(@Body() payload: CreateStudentDto) {
    return this.studentsService.CreateStudent(payload);
  }

  @Get('all')
  GetAllStudents() {
    return this.studentsService.GetAllStudents();
  }
  @Get(':studentId')
  GetStudentOneId(@Param('studentId', ParseIntPipe) studentId:number){
    return this.studentsService.GetStudentOneId(studentId)
  }

  @Put(':studentId')
  UpdateStudent(@Param('studentId',ParseIntPipe) studentId: number, @Body() payload: UpdateStudentDto) {
    return this.studentsService.UpdateStudent(studentId, payload);
  }

  @Delete(':studentId')
  DeleteStudent(@Param('studentId',ParseIntPipe) studentId: number) {
    return this.studentsService.DeleteStudent(studentId);
  }
}
