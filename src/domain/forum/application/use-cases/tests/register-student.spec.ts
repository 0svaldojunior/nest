import { FakeHashed } from 'test/cryptography/fake-hashed'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { RegisterStudentUseCase } from '../register-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHashed: FakeHashed

let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHashed = new FakeHashed()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHashed)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isSuccess()).toBeTruthy()
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHashed.hash('123456')

    expect(result.isSuccess()).toBeTruthy()
    expect(inMemoryStudentsRepository.items[0].password).not.toBe('123456') // hashed password
    expect(inMemoryStudentsRepository.items[0].password).toBe(hashedPassword)
  })
})
