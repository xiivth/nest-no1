import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EthersService } from './shared/ethers/ethers.service';

@Controller()
export class AppController {
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
