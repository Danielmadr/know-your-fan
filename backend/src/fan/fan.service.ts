import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fan } from './fan.schema';

@Injectable()
export class FanService {
  constructor(@InjectModel(Fan.name) private fanModel: Model<Fan>) {}

  async create(data: any): Promise<Fan> {
    const createdFan = new this.fanModel(data);
    return createdFan.save();
  }
}
