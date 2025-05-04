// dto/create-fan.dto.ts
import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

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
  @IsArray() influencers: string[];
  @IsString() events: string;
  @IsString() favoriteGame: string;
  @IsString() Instagram: string;
  @IsString() X_Twitter: string;
  @IsString() others: string;
  @IsString() exclusiveContent: string;
  @IsString() message: string;
}
