import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WhatsAppService } from '../whatsapp/whatsapp.service';

@Module({
  controllers: [WebhookController],
  providers: [WhatsAppService],
})
export class WebhookModule {}
