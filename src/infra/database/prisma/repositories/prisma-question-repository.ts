import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'

@Injectable()
export class PrismaQuestionsRepository implements QuestionRepository {
  findById(id: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.')
  }

  save(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  create(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
