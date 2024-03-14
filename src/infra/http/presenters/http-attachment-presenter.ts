import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class HttpAttachmentPresenter {
  static toHTTP(attachment: Attachment) {
    return {
      id: attachment.id.toString(),
      url: attachment.url,
      title: attachment.title,
    }
  }
}
