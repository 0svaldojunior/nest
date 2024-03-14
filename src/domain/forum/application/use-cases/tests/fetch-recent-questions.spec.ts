import { FetchRecentQuestionsUseCase } from '../fetch-recent-questions'
import { InMemoryQuestionsAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionsAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionsAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2022-0-20') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2022-0-18') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2022-0-23') }),
    )

    const { value } = await sut.execute({ page: 1 })

    expect(value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2022-0-23') }),
      expect.objectContaining({ createdAt: new Date('2022-0-20') }),
      expect.objectContaining({ createdAt: new Date('2022-0-18') }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { value } = await sut.execute({ page: 2 })

    expect(value?.questions).toHaveLength(2)
  })
})
