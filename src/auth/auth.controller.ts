import { Get, Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/interfaces/user-interface';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso.',
    schema: {
      example: {
        user: {
          id: 1,
          username: 'johndoe',
          createdAt: '2025-01-20T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
    schema: {
      example: {
        statusCode: 400,
        message: 'As senhas não coincidem',
        error: 'Bad Request',
      },
    },
  })
  @ApiBody({
    description: 'Dados para registrar um novo usuário',
    schema: {
      example: {
        username: 'johndoe',
        password: 'securePassword123!',
        confirmPassword: 'securePassword123!',
      },
    },
  })
  async register(@Body() body: CreateUserDto) {
    const { username, password, confirmPassword } = body;
    const user = await this.authService.register(username, password, confirmPassword);
    return { user };
  }

  @Post('login')
  @ApiOperation({ summary: 'Fazer login de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    schema: {
      example: {
        message: 'Login realizado com sucesso',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Usuário não encontrado',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBody({
    description: 'Credenciais para login',
    schema: {
      example: {
        username: 'johndoe',
        password: 'securePassword123!',
      },
    },
  })
  async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
    const { username, password } = body;
    await this.authService.login(username, password, res);
    return res.json({ message: 'Login realizado com sucesso' });
  }

  @Post('logout')
  @ApiOperation({ summary: 'Fazer logout de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Logout realizado com sucesso.',
    schema: {
      example: {
        message: 'Logout realizado com sucesso',
      },
    },
  })
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.json({ message: 'Logout realizado com sucesso' });
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validar autenticação do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso.',
    schema: {
      example: {
        user: {
          id: 'e996b30f-5b02-4664-9c3c-ece22dc48a91',
          username: 'johndoe',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    schema: {
      example: {
        statusCode: 401,
        message: 'Token inválido',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBearerAuth('JWT-auth')
  validate(@Req() req: Request & { user: User }) {
    return { user: req.user };
  }
}
