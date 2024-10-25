import { Injectable } from '@nestjs/common';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { EthersService } from 'src/shared/ethers/ethers.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { DeleteInstituteDto } from './dto/delete-institute.dto';

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
    // return `This action returns all institutes`;
    return this.prismaService.institutes.findMany();
  }

  findOne(id: string) {
    // return `This action returns a #${id} institute`;
    return this.prismaService.institutes.findUnique({
      where: { id },
    });
  }

  update(id: string, updateInstituteDto: UpdateInstituteDto) {
    // return `This action updates a #${id} institute`;
    return this.prismaService.institutes.update({
      where: { id },
      data: updateInstituteDto,
    });
  }

  remove(id: string, deleteInstituteDto: DeleteInstituteDto) {
    // return `This action removes a #${id} institute`;
    deleteInstituteDto.active = false;

    return this.prismaService.institutes.update({
      where: { id },
      data: deleteInstituteDto,
    });
  }
}
