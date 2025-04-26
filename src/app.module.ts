import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { WhatsAppService } from './whatsapp/whatsapp.service';
import { ConfigModule } from './config/config.module';
import { WhatsAppModule } from './whatsapp/whatsapp.module';

import * as dotenv from 'dotenv';

dotenv.config();

console.log('Access Token:', process.env.WHATSAPP_ACCESS_TOKEN);
console.log('Phone Number ID:', process.env.WHATSAPP_PHONE_NUMBER_ID);
@Module({
  imports: [WebhookModule,WhatsAppModule,ConfigModule],
  controllers: [AppController],
  providers: [AppService, WhatsAppService],
})
export class AppModule {}
