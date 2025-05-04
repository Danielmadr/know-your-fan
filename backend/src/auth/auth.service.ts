import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fan, FanDocument } from '../fan/schemas/fan.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Fan.name) private fanModel: Model<FanDocument>) {}

  async login(username: string, password: string) {
    const fan = await this.fanModel.findOne({ username });

    if (!fan) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    if (fan.password !== password) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }

    return {
      name: fan.fullName,
      nickname: fan.nickname,
      personalChatbot: fan.personalChatbot,
    };
  }
}
