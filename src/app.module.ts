import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CallModule } from './call/call.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://user1234:user1234@cluster0.okbhp.mongodb.net/?retryWrites=true&w=majority',
    ),
    CallModule,
    ConfigModule.forRoot(),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        accountSid: cfg.get('TWILIO_ACCOUNT_SID'),
        authToken: cfg.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
