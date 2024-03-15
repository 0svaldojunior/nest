import { Either, error, success } from '@/core/either'

import { Injectable } from '@nestjs/common'
import { NotAllowedError } from '@/core/errors/not-allowed.error'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationRepository } from '../repositories/notification-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return error(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return error(new NotAllowedError())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return success({ notification })
  }
}
