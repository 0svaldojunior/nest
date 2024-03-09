import { CommentOnAnswerUseCase } from '../comment-on-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryAnswersAttachmentsRepository } from 'test/repositories/in-memory-answer-attachment-repository'
import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswersCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswersAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswersAttachmentsRepository,
    )
    inMemoryAnswerCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment o answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'New comment',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'New comment',
    )
  })
})
