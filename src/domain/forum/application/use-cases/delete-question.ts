import { Either, error, success } from '@/core/either'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { QuestionRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return error(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return error(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return success(null)
  }
}
