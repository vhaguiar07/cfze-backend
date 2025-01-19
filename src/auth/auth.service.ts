import { Injectable, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';  // Adicionando ConflictException
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Cadastro de um novo usuário
  async register(username: string, password: string, confirmPassword: string) {
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas não coincidem');
    }

    // Verifica se o nome de usuário já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Nome de usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return user;
  }

  // Login de usuário (gera o JWT)
  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
