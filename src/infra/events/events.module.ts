import { DatabaseModule } from '../database/database.module'
import { Module } from '@nestjs/common'
import { OnAnswerCreated } from '@/domain/notification/application/subscriber/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscriber/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
