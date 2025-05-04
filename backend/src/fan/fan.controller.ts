import {
  Controller,
  Post,
  UploadedFiles,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FanService } from './fan.service';
import { CreateFanDto } from './dto/create-fan.dto';

@Controller('fans')
@ApiTags('Fans') // Agrupa os endpoints no Swagger sob "Fans"
export class FansController {
  constructor(private readonly fanService: FanService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo fã com dados e arquivos' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados do fã e arquivos de documento e selfie',
    schema: {
      type: 'object',
      properties: {
        document: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo do documento do fã',
        },
        selfie: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo da selfie do fã',
        },
        fullName: { type: 'string', example: 'João Silva' },
        nickname: { type: 'string', example: 'jsilva' },
        email: { type: 'string', example: 'joao.silva@example.com' },
        username: { type: 'string', example: 'jsilva123' },
        password: { type: 'string', example: 'senha123' },
        cpfDisplay: { type: 'string', example: '123.456.789-00' },
        cpf: { type: 'string', example: '12345678900' },
        location: { type: 'string', example: 'São Paulo, SP' },
        socials: {
          type: 'array',
          items: { type: 'string' },
          example: ['instagram', 'twitter', 'youtube'],
        },
        ecommerce: {
          type: 'array',
          items: { type: 'string' },
          example: ['jersey', 'mouse pad'],
        },
        content: {
          type: 'array',
          items: { type: 'string' },
          example: ['bastidores', 'highlights'],
        },
        influencers: {
          type: 'array',
          items: { type: 'string' },
          example: ['fallen', 'gaules'],
        },
        events: { type: 'string', example: 'ESL Pro League, BLAST Premier' },
        favoriteGame: { type: 'string', example: 'CS:GO' },
        instagram: { type: 'string', example: 'joaosilva' },
        x: { type: 'string', example: 'jsilva123' },
        others: { type: 'string', example: 'Discord: jsilva#1234' },
        exclusiveContent: { type: 'string', example: 'sim' },
        message: { type: 'string', example: 'Sou fã da FURIA desde 2019!' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Fã criado com sucesso',
    schema: {
      example: {
        _id: '60d21b4667d0d8992e610c85',
        fullName: 'João Silva',
        nickname: 'jsilva',
        email: 'joao.silva@example.com',
        username: 'jsilva123',
        documentPath: './uploads/document-123456789.pdf',
        selfiePath: './uploads/selfie-987654321.jpg',
        createdAt: '2025-05-04T12:00:00.000Z',
        updatedAt: '2025-05-04T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação nos dados enviados',
  })
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
    @Body() body: CreateFanDto,
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
