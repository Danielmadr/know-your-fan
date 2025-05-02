import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private aiUrl = 'http://localhost:5000/analyze';
  private username = 'furia_admin';
  private password = 'senha_secreta';

  async analyzeFanProfile(fanData: any): Promise<any> {
    try {
      const response = await axios.post(this.aiUrl, fanData, {
        auth: {
          username: this.username,
          password: this.password,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao chamar a IA:', error.message);
      throw new HttpException(
        'Erro ao analisar perfil do fã',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
