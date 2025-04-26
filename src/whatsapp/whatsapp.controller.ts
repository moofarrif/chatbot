import { Controller, Post } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('send-message')
  async sendMessage() {
    const phone = '1234567890'; // El número de teléfono del destinatario
    const message = 'Hola, ¿cómo puedo ayudarte?'; // El mensaje a enviar
    await this.whatsappService.handleIncomingMessage(phone, message);
  }
}
