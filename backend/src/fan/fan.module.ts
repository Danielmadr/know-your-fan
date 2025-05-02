import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FanController } from './fan.controller';
import { FanService } from './fan.service';
import { Fan, FanSchema } from './fan.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fan.name, schema: FanSchema }])],
  controllers: [FanController],
  providers: [FanService],
})
export class FanModule {}
