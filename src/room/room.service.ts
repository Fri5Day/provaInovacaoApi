import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/room-create.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoomDto) {
    const existRoomName = await this.prisma.room.findUnique({
      where: { name: data.name },
    });

    if (existRoomName) {
      throw new BadRequestException('Nome da sala já existe');
    }

    return this.prisma.room.create({
      data: {
        ...data,
        user_id: Number(data.user_id),
        size: Number(data.size),
      },
    });
  }

  async getAll() {
    return this.prisma.room.findMany();
  }

  async update(id: number, data: CreateRoomDto) {
    const existRoom = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!existRoom) {
      throw new BadRequestException('Sala não encontrada');
    }

    if (data.name !== existRoom.name) {
      const nameExists = await this.prisma.room.findUnique({
        where: { name: data.name },
      });
      if (nameExists) {
        throw new BadRequestException('Nome da sala já existe');
      }
    }

    return this.prisma.room.update({
      where: { id },
      data: {
        ...data,
        user_id: Number(data.user_id),
        size: Number(data.size),
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    try {
      return await this.prisma.room.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Não é possível deletar a sala: ela possui reservas ou outros registros relacionados'
        );
      }
      throw error;
    }
  }

  async exists(id: number) {
    const existRoom = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!existRoom) {
      throw new BadRequestException('Sala não encontrada');
    }
  }
}
