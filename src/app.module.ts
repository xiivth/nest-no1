import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { ConfigModule } from '@nestjs/config';
import { CertificatesModule } from './certificates/certificates.module';
import { EthersModule } from './shared/ethers/ethers.module';

@Module({
  imports: [ConfigModule.forRoot(), EthersModule, CertificatesModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
