import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum Role {
  user = 'user',
  issuer = 'issuer',
  admin = 'admin',
}

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  instituteId?: string;

  @IsString()
  createdBy: string;

  @IsString()
  updatedBy: string;
}
