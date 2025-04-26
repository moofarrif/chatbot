import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { WhatsAppService } from 'src/whatsapp/whatsapp.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post()
  async handleMessage(@Body() body: any, @Res() res: Response) {
    console.log('Mensaje recibido:', JSON.stringify(body, null, 2));

    const entry = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const message = change?.value?.messages?.[0];
    const from = message?.from;
    const text = message?.text?.body;

    if (from && text) {
      await this.whatsappService.handleIncomingMessage(from, text);
    }

    res.sendStatus(200);
  }
}
