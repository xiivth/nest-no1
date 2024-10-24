import { IsString } from 'class-validator';

export class CreateInstituteDto {
  @IsString()
  instituteName: string;
  @IsString()
  instituteAbbr: string;
  @IsString()
  createdBy: string;
  @IsString()
  updatedBy: string;
}
