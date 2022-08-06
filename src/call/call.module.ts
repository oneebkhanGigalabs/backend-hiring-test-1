import { Module } from '@nestjs/common'
import { CallService } from './call.service'
import { CallController } from './call.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CallSchema } from './schemas/call.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Call', schema: CallSchema }]),
  ],
  providers: [CallService],
  controllers: [CallController],
})
export class CallModule {}
