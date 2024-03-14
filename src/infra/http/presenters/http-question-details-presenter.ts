import { HttpAttachmentPresenter } from './http-attachment-presenter'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/questions-details'

export class HttQuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      authorName: questionDetails.authorName,
      title: questionDetails.title,
      content: questionDetails.content,
      slug: questionDetails.slug.value,
      bestAnswerId: questionDetails.bestAnswerId?.toString(),
      attachments: questionDetails.attachments.map(
        HttpAttachmentPresenter.toHTTP,
      ),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
