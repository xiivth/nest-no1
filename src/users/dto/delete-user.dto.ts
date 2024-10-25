import { IsString } from 'class-validator';

export class DeleteUserDto {
  active: boolean;

  @IsString()
  updatedBy: string;
}
