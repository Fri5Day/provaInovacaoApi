import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const existEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existEmail) {
      throw new BadRequestException('Email já cadastrado');
    }

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    try {
      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuário');
    }
  }

  async getAll() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new BadRequestException('Erro ao buscar usuários');
    }
  }

  async update(id: number, data: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existUser) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, await bcrypt.genSalt());

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar usuário');
    }
  }

  async delete(id: number) {
    const existUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existUser) {
      throw new BadRequestException('Usuário não encontrado');
    }

    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Não é possível deletar o usuário: ele possui salas ou outros registros relacionados'
        );
      }
      throw error;
    }
  }
}
