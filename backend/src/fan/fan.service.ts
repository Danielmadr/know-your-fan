// fan.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fan, FanDocument } from './schemas/fan.schema';

@Injectable()
export class FanService {
  constructor(@InjectModel(Fan.name) private fanModel: Model<FanDocument>) {}

  async createFan(body: any, files: { documentPath: string | null; selfiePath: string | null }) {
    const fan = new this.fanModel({
      ...body,
      socials: Array.isArray(body.socials) ? body.socials : [body.socials],
      content: Array.isArray(body.content) ? body.content : [body.content],
      influencers: Array.isArray(body.influencers) ? body.influencers : [body.influencers],
      documentPath: files.documentPath,
      selfiePath: files.selfiePath,
    });
    return fan.save();
  }
}
