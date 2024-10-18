import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { EthersModule } from 'src/shared/ethers/ethers.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  imports: [EthersModule, PrismaModule],
  controllers: [CertificatesController],
  providers: [CertificatesService],
})
export class CertificatesModule {}
