// dto/create-fan.dto.ts
import { IsString, IsEmail, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateFanDto {
  @IsString() fullName: string;
  @IsString() nickname: string;
  @IsEmail() email: string;
  @IsString() username: string;
  @IsString() password: string;
  @IsString() cpfDisplay: string;
  @IsString() cpf: string;
  @IsString() location: string;
  @IsArray() socials: string[];
  @IsString() ecommerce: string;
  @IsArray() content: string[];

  @IsOptional()
  @IsArray()
  influencers: string[];

  @IsString()
  @IsOptional()
  events?: string;

  @IsString()
  @IsOptional()
  favoriteGame?: string;

  @IsString()
  @IsOptional()
  instagram?: string; // Renamed from Instagram

  @IsString()
  @IsOptional()
  x?: string; // Renamed from X_Twitter

  @IsString()
  @IsOptional()
  others?: string;

  @IsString()
  @IsOptional()
  exclusiveContent?: string;

  @IsString()
  @IsOptional()
  message?: string;

  // Adding optional fields for AI/analysis data
  @IsString()
  @IsOptional()
  documentStatus?: string;

  @IsString()
  @IsOptional()
  documentReport?: string;

  @IsString()
  @IsOptional()
  selfieStatus?: string;

  @IsNumber()
  @IsOptional()
  selfieMatchScore?: number;

  @IsString()
  @IsOptional()
  fanStatus?: string;

  @IsString()
  @IsOptional()
  fanType?: string;

  @IsNumber()
  @IsOptional()
  engagementScore?: number;

  @IsString()
  @IsOptional()
  contentPreference?: string;

  @IsString()
  @IsOptional()
  potentialRevenue?: string;

  @IsString()
  @IsOptional()
  recommendationSummary?: string;

  @IsString()
  @IsOptional()
  personalChatbot?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  fan_id?: string;
}
