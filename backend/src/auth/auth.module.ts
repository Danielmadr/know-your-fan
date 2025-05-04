import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FanModule } from '../fan/fan.module';

@Module({
  imports: [FanModule], // Importa o FanModule
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
