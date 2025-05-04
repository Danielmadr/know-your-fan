import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FansController } from './fan.controller';
import { FanService } from './fan.service';
import { Fan, FanSchema } from './schemas/fan.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fan.name, schema: FanSchema }])],
  controllers: [FansController],
  providers: [FanService],
})
export class FanModule {}
