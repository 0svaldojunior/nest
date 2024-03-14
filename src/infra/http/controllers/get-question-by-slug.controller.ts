import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { HttQuestionDetailsPresenter } from '../presenters/http-question-details-presenter'

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

    return {
      question: HttQuestionDetailsPresenter.toHTTP(result.value.question),
    }
  }
}
