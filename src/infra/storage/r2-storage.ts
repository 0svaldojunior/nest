import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import {
  UploadParams,
  Uploader,
} from '@/domain/forum/application/storage/uploader'

import { EnvService } from '../env/env.service'
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client

  constructor(private envService: EnvService) {
    const endpoint = envService.get('AWS_ENDPOINT')

    this.client = new S3Client({
      endpoint,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY'),
      },
    })
  }

  async upload({
    body,
    fileName,
    fileType,
  }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    )

    return {
      url: uniqueFileName,
    }
  }
}
