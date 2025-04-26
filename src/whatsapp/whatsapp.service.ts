import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { ConfigService } from 'src/config/config.service';

@Injectable()
export class WhatsAppService {
  accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  async handleIncomingMessage(from: string, text: string) {
    console.log(`Mensaje de ${from}: ${text}`);

    const reply = this.generateReply(text);

    await this.sendMessage(from, reply);
  }

  private async sendMessage(to: string, body: string) {
    const url = `https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    const a = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: { name: 'hello_world', language: { code: 'en_US' } },
    };

    try {
      const response = await axios.post(url, a, { headers });
      console.log('Mensaje enviado:', response.data);
    } catch (error) {
      
      console.error('Error al enviar el mensaje:', error.response?.data || error.message);
    }
  }

  private generateReply(text: string): string {
    if (text.toLowerCase().includes('hola')) {
      return '¡Hola! Bienvenido al Trasnugón Digital. ¿En qué sector estás interesado?';
    }
    return 'Gracias por tu mensaje. Pronto te contactaremos.';
  }
}
