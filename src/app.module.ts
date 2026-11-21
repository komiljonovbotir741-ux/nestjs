import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersController } from './users/users.controller.js';
import { UsersModule } from './users/users.module.js';
import { TeachersModule } from './teachers/teachers.module.js';
import { StudentsModule } from './students/students.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),PrismaModule, UsersModule, TeachersModule, StudentsModule],
  
})
export class AppModule {}