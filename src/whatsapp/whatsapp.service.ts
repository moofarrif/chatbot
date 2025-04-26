import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { ConfigService } from 'src/config/config.service';

@Injectable()
export class WhatsAppService {
  // No inicialices la propiedad aquí, sino en el constructor
  // private accessToken: string;
  // private phoneNumberId: string;

  accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  // constructor(private configService: ConfigService) {
  //   // Aquí es donde debes inicializar las propiedades con el valor de las variables de entorno
  //   this.accessToken = this.configService.get('WHATSAPP_ACCESS_TOKEN');
  //   this.phoneNumberId = this.configService.get('WHATSAPP_PHONE_NUMBER_ID');
  // }

  async handleIncomingMessage(from: string, text: string) {
    console.log(`Mensaje de ${from}: ${text}`);

    // Aquí puedes manejar lógica condicional para flujo tipo chatbot
    const reply = this.generateReply(text);

    await this.sendMessage(from, reply);
  }

  private async sendMessage(to: string, body: string) {
    const url = `https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`;
    const headers = {
      // Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    // const a = {
    //   messaging_product: 'whatsapp',
    //   to: '',
    //   type: 'template',
    //   template: { name: 'hello_world', language: { code: 'en_US' } },
    // };

    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      text: { body },
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log('Mensaje enviado:', response.data);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  }

  private generateReply(text: string): string {
    if (text.toLowerCase().includes('hola')) {
      return '¡Hola! Bienvenido al Trasnugón Digital. ¿En qué sector estás interesado?';
    }
    return 'Gracias por tu mensaje. Pronto te contactaremos.';
  }
}
