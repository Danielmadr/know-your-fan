import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fan, FanDocument } from './schemas/fan.schema';
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class FanService {
  constructor(@InjectModel(Fan.name) private fanModel: Model<FanDocument>) {}

  async createFan(
    body: any,
    files: { documentPath: string | null; selfiePath: string | null },
  ) {
    // Persistindo os dados iniciais no banco
    const fan = new this.fanModel({
      ...body,
      socials: Array.isArray(body.socials) ? body.socials : [body.socials],
      content: Array.isArray(body.content) ? body.content : [body.content],
      influencers: Array.isArray(body.influencers)
        ? body.influencers
        : [body.influencers],
      documentPath: files.documentPath,
      selfiePath: files.selfiePath,
    });
    const savedFan = await fan.save();

    // Preparando os dados para enviar ao serviço de IA
    const formData = new FormData();
    formData.append('data', JSON.stringify(savedFan.toObject())); // Envia os dados do fã como string JSON

    if (files.documentPath) {
      formData.append('document', fs.createReadStream(files.documentPath)); // Adiciona o arquivo do documento
    }
    if (files.selfiePath) {
      formData.append('selfie', fs.createReadStream(files.selfiePath)); // Adiciona o arquivo da selfie
    }

    try {
      // Fazendo a requisição para o serviço de IA
      const response = await axios.post(
        'http://localhost:5000/fanAnalyze/',
        formData,
        {
          headers: formData.getHeaders(),
        },
      );

      console.log('Resposta do serviço de IA:', response.data);
      // Atualizando o registro do fã com os dados enriquecidos retornados pela IA
      const enrichedData = response.data;
      await this.fanModel.findByIdAndUpdate(savedFan._id, enrichedData, {
        new: true,
      });

      console.log('Dados do fã atualizados com sucesso:', enrichedData);

      return enrichedData; // Retorna os dados enriquecidos
    } catch (error) {
      console.error('Erro ao chamar o serviço de IA:', error.message);
      throw new HttpException(
        'Erro ao analisar perfil do fã com IA',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
