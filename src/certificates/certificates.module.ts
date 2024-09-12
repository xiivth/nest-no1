import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { EthersModule } from 'src/shared/ethers/ethers.module';

@Module({
  imports: [EthersModule],
  controllers: [CertificatesController],
  providers: [CertificatesService],
})
export class CertificatesModule {}
