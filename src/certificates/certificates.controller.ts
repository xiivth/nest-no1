import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotImplementedException,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    console.log(createCertificateDto);
    return this.certificatesService.create(createCertificateDto);
  }

  // @Post()
  // create(@Body() createCertificateDto: any) {
  //   console.log(createCertificateDto);
  //   return this.certificatesService.create(createCertificateDto);
  // }

  @Get()
  findAll() {
    return this.certificatesService.findAll();
  }

  @Get('verify')
  async verify() {
    return await this.certificatesService.verify();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificatesService.update(+id, updateCertificateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificatesService.remove(+id);
  }

  @Post('issue')
  async issue(@Query() query: any) {
    try {
      const hash = await this.certificatesService.issue(
        query.maxTransactionFee,
        query.root,
      );
      if (!hash) {
        throw new NotImplementedException();
      }
      return hash;
    } catch (error) {
      throw new NotImplementedException(error.message);
    }
  }
}
