import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { ConfigModule } from '@nestjs/config';
import { CertificatesModule } from './certificates/certificates.module';
import { EthersModule } from './shared/ethers/ethers.module';
import { PrismaService } from './shared/prisma/prisma.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { InstitutesModule } from './institutes/institutes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EthersModule,
    CertificatesModule,
    PrismaModule,
    InstitutesModule,
    UsersModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, PrismaService],
})
export class AppModule {}
