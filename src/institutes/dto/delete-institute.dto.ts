import { IsString } from 'class-validator';

export class DeleteInstituteDto {
  active: boolean;
  @IsString()
  updatedBy: string;
}
