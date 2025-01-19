import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth/create-user.dto';

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
  async login(@Body() body: { username: string, password: string }) {
    const { username, password } = body;
    const result = await this.authService.login(username, password);
    return result;
  }
}
