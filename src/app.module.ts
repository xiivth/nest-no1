import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { EthersModule } from './shared/ethers/ethers.module';
import { EthersService } from './shared/ethers/ethers.service';

@Module({
  imports: [EthersModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, EthersService],
})
export class AppModule {}
