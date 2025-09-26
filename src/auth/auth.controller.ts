import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('usuarios')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const { password, ...userWithoutPassword } = req.user;
    return userWithoutPassword;
  }
}