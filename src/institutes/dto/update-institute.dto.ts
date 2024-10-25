import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateInstituteDto } from './create-institute.dto';
import { IsString } from 'class-validator';

export class UpdateInstituteDto extends PartialType(
  OmitType(CreateInstituteDto, ['createdBy', 'updatedBy'] as const),
) {
  @IsString()
  updatedBy: string;
}
