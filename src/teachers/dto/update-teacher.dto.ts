import {IsInt, IsNumber, IsOptional, IsPhoneNumber, IsPositive, IsString, Max, max, MaxLength, MinLength} from "class-validator"

export class UpdateTeacherDto{
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    fullname?:string
    @IsString()
    @IsPhoneNumber("UZ")
    @IsOptional()
    phone?:string
    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsOptional()
    age?:number
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?:string
    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsOptional()
    experience?:number
}
