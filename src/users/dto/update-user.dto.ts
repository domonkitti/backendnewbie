import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsEnum(Role)
    role: Role;

    @IsString()
    @IsNotEmpty()
    displayname: string;
}
