import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EthersService } from 'src/shared/ethers/ethers.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly etherService: EthersService,
    private readonly prismaService: PrismaService,
  ) {}

  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    return this.prismaService.users.create({ data: createUserDto });
  }

  findAll() {
    // return `This action returns all users`;
    return this.prismaService.users.findMany();
  }

  findOne(id: string) {
    // return `This action returns a #${id} user`;
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    // console.log(Object.keys(updateUserDto).length);
    return this.prismaService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string, deleteUserDto: DeleteUserDto) {
    // return `This action removes a #${id} user`;
    deleteUserDto.active = false;

    return this.prismaService.users.update({
      where: { id },
      data: deleteUserDto,
    });
  }
}
