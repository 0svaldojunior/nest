import { FakeUploader } from 'test/storage/fake-uploader'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { InvalidAttachmentTypeError } from '../errors/invalid-attachment-type.error'
import { UploadAndCreateAttachmentUseCase } from '../upload-and-create-attachment'

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader

let sut: UploadAndCreateAttachmentUseCase

describe('Upload and create attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'file.jpg',
      fileType: 'image/jpeg',
      body: Buffer.from(''),
    })

    expect(result.isSuccess()).toBeTruthy()
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.uploads.length).toBe(1)
    expect(fakeUploader.uploads[0].fileName).toBe('file.jpg')
  })

  it('should be able to upload and attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'file.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isError()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})
