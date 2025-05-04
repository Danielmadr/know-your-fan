import {
  Controller,
  Post,
  UploadedFiles,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FanService } from './fan.service';

@Controller('fans')
export class FansController {
  constructor(private readonly fanService: FanService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'document', maxCount: 1 },
        { name: 'selfie', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(
              null,
              `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
            );
          },
        }),
      },
    ),
  )
  async createFan(
    @UploadedFiles()
    files: {
      document?: Express.Multer.File[];
      selfie?: Express.Multer.File[];
    } = {},
    @Body() body: any,
  ) {
    console.log('📁 Files recebidos:', files);

    const document = files?.document?.[0];
    const selfie = files?.selfie?.[0];

    return this.fanService.createFan(body, {
      documentPath: document?.path || null,
      selfiePath: selfie?.path || null,
    });
  }
}
