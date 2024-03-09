import { FetchAnswerCommentsUseCase } from '../fetch-answer-comments'
import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { expect } from 'vitest'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answers Comments', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswersCommentsRepository)
  })

  it('should be able to fetch answers comments', async () => {
    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answers comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
