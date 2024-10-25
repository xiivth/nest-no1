import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EthersModule } from 'src/shared/ethers/ethers.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  imports: [EthersModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
