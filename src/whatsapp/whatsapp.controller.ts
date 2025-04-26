import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import { Request, Response } from 'express';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('send-message')
  async sendMessage() {
    const phone = '1234567890'; // El número de teléfono del destinatario
    const message = 'Hola, ¿cómo puedo ayudarte?'; // El mensaje a enviar
    await this.whatsappService.handleIncomingMessage(phone, message);
  }

  @Get('send-message')
  async sendMessageGet(@Req() req: Request, @Res() res: Response) {
    const mode = req.query['hub.mode'] as string;
    const token = req.query['hub.verify_token'] as string;
    const challenge = req.query['hub.challenge'] as string;

    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

    console.log('mode:', mode);
    console.log('token:', token);
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Token inválido');
    }
  }
}
