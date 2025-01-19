import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const { username, password, confirmPassword } = body;
    const user = await this.authService.register(username, password, confirmPassword);
    return { user };
  }

  @Post('login')
  async login(@Body() body: { username: string, password: string }, @Res() res: Response) {
    const { username, password } = body;
    await this.authService.login(username, password, res);
    return res.json({ message: 'Login realizado com sucesso' });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.json({ message: 'Logout realizado com sucesso' });
  }
}
