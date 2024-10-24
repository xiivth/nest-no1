import { Module } from '@nestjs/common';
import { InstitutesService } from './institutes.service';
import { InstitutesController } from './institutes.controller';
import { EthersModule } from 'src/shared/ethers/ethers.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  imports: [EthersModule, PrismaModule],
  controllers: [InstitutesController],
  providers: [InstitutesService],
})
export class InstitutesModule {}
