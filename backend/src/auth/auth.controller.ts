import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth') // Agrupa os endpoints no Swagger sob "Auth"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login do fã' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      example: {
        nickname: 'FanNickname',
        personalChatbot: 'Chatbot123',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Senha inválida',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
