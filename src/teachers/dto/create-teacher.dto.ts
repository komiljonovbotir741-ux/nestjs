import {IsInt,IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString, Max, max, MaxLength, MinLength} from "class-validator"

export class CreateTeacherDto{
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    fullname:string
    @IsString()
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone:string
    @IsNumber()
    @IsInt()
    @IsPositive()
    age:number
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password:string
    @IsNumber()
    @IsInt()
    @IsPositive()
    experience:number
}