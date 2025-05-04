import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FanModule } from './fan/fan.module';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true } as ConfigModuleOptions),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        (() => {
          throw new Error('MONGODB_URI is not defined');
        })(),
    ),
    FanModule,
    AiModule,
    AuthModule,
  ],
  providers: [AiService, AuthService],
  controllers: [AuthController],
})
export class AppModule {}
