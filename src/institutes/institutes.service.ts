import { Injectable } from '@nestjs/common';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { EthersService } from 'src/shared/ethers/ethers.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class InstitutesService {
  constructor(
    private readonly etherService: EthersService,
    private readonly prismaService: PrismaService,
  ) {}

  create(createInstituteDto: CreateInstituteDto) {
    // return 'This action adds a new institute';
    return this.prismaService.institutes.create({ data: createInstituteDto });
  }

  findAll() {
    return `This action returns all institutes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institute`;
  }

  update(id: number, updateInstituteDto: UpdateInstituteDto) {
    return `This action updates a #${id} institute`;
  }

  remove(id: number) {
    return `This action removes a #${id} institute`;
  }
}
