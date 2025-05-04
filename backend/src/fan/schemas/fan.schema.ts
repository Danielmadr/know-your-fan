// schemas/fan.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Fan {
  @Prop() fullName: string;
  @Prop() nickname: string;
  @Prop() email: string;
  @Prop() username: string;
  @Prop() password: string;
  @Prop() cpfDisplay: string;
  @Prop() cpf: string;
  @Prop() location: string;
  @Prop([String]) socials: string[];
  @Prop([String]) ecommerce: string[];
  @Prop([String]) content: string[];
  @Prop([String]) influencers: string[];
  @Prop() events: string;
  @Prop() favoriteGame: string;
  @Prop() instagram: string;
  @Prop() x: string;
  @Prop() others: string;
  @Prop() exclusiveContent: string;
  @Prop() message: string;
  @Prop() documentPath: string;
  @Prop() selfiePath: string;

  @Prop({ default: 'pending' }) documentStatus: string;
  @Prop() documentReport: string;
  @Prop({ default: 'pending' }) selfieStatus: string;
  @Prop() selfieMatchScore: number;
  @Prop({ default: 'pending' }) fanStatus: string;
  @Prop({ default: 'user' }) fanType: string;
  @Prop() engagementScore: number;
  @Prop() contentPreference: string;
  @Prop() potentialRevenue: string;
  @Prop() recommendationSummary: string;
  @Prop() personalChatbot: string;
  @Prop() type: string;
  @Prop() fan_id: string;
}

export type FanDocument = Fan & Document;
export const FanSchema = SchemaFactory.createForClass(Fan);
