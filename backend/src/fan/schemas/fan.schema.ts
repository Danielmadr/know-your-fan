// schemas/fan.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
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
  @Prop() ecommerce: string;
  @Prop([String]) content: string[];
  @Prop([String]) influencers: string[];
  @Prop() events: string;
  @Prop() favoriteGame: string;
  @Prop() Instagram: string;
  @Prop() X_Twitter: string;
  @Prop() others: string;
  @Prop() exclusiveContent: string;
  @Prop() message: string;
  @Prop() documentPath: string;
  @Prop() selfiePath: string;
}

export type FanDocument = Fan & Document;
export const FanSchema = SchemaFactory.createForClass(Fan);
