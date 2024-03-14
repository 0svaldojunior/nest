import { FetchQuestionCommentsUseCase } from '../fetch-question-comments'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { expect } from 'vitest'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Questions Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionsCommentsRepository(inMemoryStudentsRepository)
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionsCommentsRepository)
  })

  it('should be able to fetch questions comments', async () => {
    const student = makeStudent({
      name: 'John Doe',
    })

    inMemoryStudentsRepository.items.push(student)

    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    await inMemoryQuestionsCommentsRepository.create(comment1)
    await inMemoryQuestionsCommentsRepository.create(comment2)
    await inMemoryQuestionsCommentsRepository.create(comment3)

    const { value } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(value?.comments).toHaveLength(3)
    expect(value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authorName: 'John Doe',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          authorName: 'John Doe',
          commentId: comment3.id,
        }),
        expect.objectContaining({
          authorName: 'John Doe',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch paginated questions comments', async () => {
    const student = makeStudent()

    inMemoryStudentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
          authorId: student.id,
        }),
      )
    }

    const { value } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(value?.comments).toHaveLength(2)
  })
})
