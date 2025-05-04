import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'O nome de usuário do fã',
    example: 'fan123',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'A senha do fã',
    example: 'password123',
  })
  @IsString()
  password: string;
}
