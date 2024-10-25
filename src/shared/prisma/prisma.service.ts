// import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   async onModuleInit() {
//     console.log('connected db');
//     await this.$connect();
//   }

//   async onModuleDestroy() {
//     console.log('disconnect db');
//     await this.$disconnect();
//   }

// }

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      omit: {
        users: {
          password: true,
        },
      },
    });
  }
}
