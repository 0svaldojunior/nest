import { CreateAccountController } from './controllers/create-account.controller'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

@Module({
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
