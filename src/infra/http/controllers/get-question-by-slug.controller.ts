import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { HttQuestionPresenter } from '../presenters/http-question-presenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handler(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    return { question: HttQuestionPresenter.toHTTP(result.value.question) }
  }
}
