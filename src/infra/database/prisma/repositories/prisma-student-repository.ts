import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { StudentsRepository } from '@/domain/forum/application/repositories/student-repository'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPersistence(student)

    await this.prisma.user.create({ data })
  }
}
