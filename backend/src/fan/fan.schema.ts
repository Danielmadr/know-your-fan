import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

class DocumentDetails {
  @Prop() type: string;
  @Prop() number: string;
}

@Schema()
export class Fan extends Document {
  // forms
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
  @Prop() instagram: string;
  @Prop() x: string;
  @Prop() others: string;
  @Prop() exclusiveContent: string;
  @Prop() message: string;

  // Campos de upload de documentos
  @Prop({ type: MongooseSchema.Types.Mixed }) document: { 
    type: string; 
    data: Buffer; 
  }; // Explicit type for uploaded document
  @Prop({ type: MongooseSchema.Types.Mixed }) selfie: { 
    type: string; 
    data: Buffer; 
  }; // Explicit type for uploaded selfie

  // Campos de análise de documentos
  @Prop({ default: 'pending' }) documentStatus: string; // 'pending', 'verified', 'rejected'
  @Prop({ default: null }) documentReport: string; // report of the document analysis
  @Prop({ default: 'pending' }) selfieStatus: string; // 'pending', 'verified', 'rejected'
  @Prop({ default: null }) selfieMatchScore: number;
  analysis;
  @Prop({ default: 'pendind' }) fanStatus: string; // 'verified', 'not_verified', 'suspicious', 'pending'

  // Campos para tratamento  por IA
  @Prop({ default: null }) fanType: string; // 'casual', 'hardcore', 'colecionador', etc.
  @Prop({ default: null }) engagementScore: number;
  @Prop({ default: null }) contentPreference: string;
  @Prop({ default: null }) potentialRevenue: string;
  @Prop({ default: null }) recommendationSummary: string;
  @Prop({ default: null }) personalChatbot: string;

  // Campos de controle
  @Prop({ default: false }) type: string; // 'fan', 'admin'
  @Prop({ default: Date.now }) createdAt: Date;
  @Prop({ default: Date.now }) updatedAt: Date;
  @Prop({ default: null }) fan_id: string; // ID do fã gerado pelo sistema
}

export const FanSchema = SchemaFactory.createForClass(Fan);
