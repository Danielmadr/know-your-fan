import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

class DocumentDetails {
  @Prop() type: string;
  @Prop() number: string;
}

@Schema()
export class Fan extends Document {
  @Prop() fullName: string;
  @Prop() nickname: string;
  @Prop() email: string;
  @Prop() username: string;
  @Prop() password: string;
  @Prop() cpfDisplay: string;
  @Prop() cpf: string;
  @Prop() location: string;
  @Prop() socials: string[];
  @Prop() ecommerce: string[];
  @Prop() content: string[];
  @Prop() influencers: string;
  @Prop() events: string;
  @Prop() favoriteGame: string;
  @Prop() faceit: string;
  @Prop() hltv: string;
  @Prop() others: string;
  @Prop() exclusiveContent: string;
  @Prop() message: string;

  @Prop({ type: MongooseSchema.Types.Mixed }) document: DocumentDetails; // Explicit type
  @Prop({ type: MongooseSchema.Types.Mixed }) selfie: object;

  // Campos para tratamento posterior por IA
  @Prop({ default: 'pending' }) documentStatus: string; // 'pending', 'verified', 'rejected'
  @Prop({ default: null }) documentScore: number;
  @Prop({ default: null }) selfieMatchScore: number;

  // Perfil IA gerado
  @Prop({ default: null }) fanType: string; // 'casual', 'hardcore', 'colecionador', etc.
  @Prop({ default: null }) engagementScore: number;
  @Prop({ default: null }) contentPreference: string;
  @Prop({ default: null }) potentialRevenue: string;
  @Prop({ default: null }) recommendationSummary: string;
}

export const FanSchema = SchemaFactory.createForClass(Fan);
