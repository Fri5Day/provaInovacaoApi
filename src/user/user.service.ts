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
      throw new BadRequestException('Email já registrado');
    }

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.create({
      data,
    });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async update(id: number, data: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { id },
    });

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
