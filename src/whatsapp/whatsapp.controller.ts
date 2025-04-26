import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import { Request, Response } from 'express';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('send-message')
  async sendMessage(@Req() req: Request, @Res() res: Response) {

    console.log('req.body:', JSON.stringify(req.body.entry[0].changes, null, 2));
    const {
      from: phone,
      text: { body: message },
    } = req.body?.entry[0]?.changes[0]?.value?.messages[0];

    

    await this.whatsappService.handleIncomingMessage(phone, message);
    res.status(200).send('Mensaje enviado');
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

// req.body: [
//   {
//     "value": {
//       "messaging_product": "whatsapp",
//       "metadata": {
//         "display_phone_number": "15551543463",
//         "phone_number_id": "598337616704479"
//       },
//       "statuses": [
//         {
//           "id": "wamid.HBgMNTczMTMzODUxMTE0FQIAERgSQjg0NzIyMkE1NzAwMkIwQ0Y4AA==",
//           "status": "sent",
//           "timestamp": "1745634177",
//           "recipient_id": "573133851114",
//           "conversation": {
//             "id": "8b919cbba43b51f2f1a9093649bd04ca",
//             "expiration_timestamp": "1745715900",
//             "origin": {
//               "type": "utility"
//             }
//           },
//           "pricing": {
//             "billable": true,
//             "pricing_model": "CBP",
//             "category": "utility"
//           }
//         }
//       ]
//     },
//     "field": "messages"
//   }
// ]