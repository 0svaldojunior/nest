import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQUeryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handler(
    @Query('page', queryValidationPipe) page: PageQUeryParamsSchema,
  ) {
    const itensPerPage = 20

    const questions = await this.prisma.question.findMany({
      take: itensPerPage,
      skip: (page - 1) * itensPerPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { questions }
  }
}
