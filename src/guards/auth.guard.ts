import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const tokenParts = authorization.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const token = tokenParts[1];

    try {
      const payload = this.jwtService.verify(token);

      const user = await this.prismaService.user.findUnique({
        where: { id: parseInt(payload.sub) },
      });

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }
      request.user = user;
      
      return true;
    } catch (err) {
      console.log('Erro no AuthGuard:', err.message);
      throw new UnauthorizedException('Token inválido');
    }
  }
}