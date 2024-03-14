import { AnswerQuestionUseCase } from '../answer-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryAnswersAttachmentsRepository } from 'test/repositories/in-memory-answer-attachment-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswersAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswersAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      questionId: 'any_id',
      authorId: 'any_id',
      content: 'New answer',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isSuccess()).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswerRepository.items[0].attachments.currentItems.length,
    ).toBe(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })

  it('should persist attachments when creating a new answer', async () => {
    const result = await sut.execute({
      questionId: 'question_id',
      authorId: 'author_id',
      content: 'New question',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isSuccess()).toBeTruthy()
    expect(inMemoryAnswersAttachmentsRepository.items.length).toBe(2)
    expect(inMemoryAnswersAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
      ]),
    )
  })
})
