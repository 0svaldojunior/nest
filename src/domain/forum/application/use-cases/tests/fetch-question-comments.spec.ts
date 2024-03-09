import { FetchQuestionCommentsUseCase } from '../fetch-question-comments'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { expect } from 'vitest'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Questions Comments', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionsCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionsCommentsRepository)
  })

  it('should be able to fetch questions comments', async () => {
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const { value } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated questions comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const { value } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(value?.questionComments).toHaveLength(2)
  })
})
