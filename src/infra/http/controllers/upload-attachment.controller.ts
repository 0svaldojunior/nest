import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'

import { FileInterceptor } from '@nestjs/platform-express'

const MB = 5
const MAX_FILE_SIZE = 1024 * 1024 * MB // 5MB

@Controller('/attachments')
export class UploadAttachmentController {
  // constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handler(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file)
  }
}
