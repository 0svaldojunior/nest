import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('FetchRecentQuestionsController (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'Question 1',
          slug: 'question-1',
          content: 'This is the first question',
          authorId: user.id,
        },

        {
          title: 'Question 2',
          slug: 'question-2',
          content: 'This is the second question',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Question 1' }),
        expect.objectContaining({ title: 'Question 2' }),
      ],
    })
  })
})