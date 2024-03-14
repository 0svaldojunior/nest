import { Attachment } from '../attachment'
import { Slug } from './slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface QuestionDetailsProps {
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  authorName: string
  title: string
  content: string
  slug: Slug
  attachments: Attachment[]
  bestAnswerId?: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}

export class QuestionDetails extends ValueObject<QuestionDetailsProps> {
  get questionId() {
    return this.questionId
  }

  get authorId() {
    return this.authorId
  }

  get authorName() {
    return this.authorName
  }

  get title() {
    return this.title
  }

  get content() {
    return this.content
  }

  get slug() {
    return this.slug
  }

  get attachments() {
    return this.attachments
  }

  get bestAnswerId() {
    return this.bestAnswerId
  }

  get createdAt() {
    return this.createdAt
  }

  get updatedAt() {
    return this.updatedAt
  }

  static create(props: QuestionDetailsProps) {
    return new QuestionDetails(props)
  }
}
