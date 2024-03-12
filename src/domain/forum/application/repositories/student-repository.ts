import { Student } from '../../enterprise/entities/student'

export abstract class QuestionRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract delete(student: Student): Promise<void>
}
