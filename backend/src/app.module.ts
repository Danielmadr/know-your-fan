import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FanModule } from './fan/fan.module';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';

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
  ],
  providers: [AiService],
})
export class AppModule {}
