import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    // return `This action add #${createCatDto.name} cat`;
    this.catService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Get('ab*cd')
  findWild() {
    return 'This route uses a wildcard';
  }

  @Get('docs')
  @Redirect('https://docs.nest.js.com', 302)
  getDocs(@Query('version') version: any) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
