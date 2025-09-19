import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import  { CreateRoomDto } from './dto/room-create.dto';


@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoomDto) {
    

    return this.prisma.room.create({
      data,
    });
  }

  async getAll() {
    return this.prisma.room.findMany();
  }

  async update(id: number, data: CreateRoomDto) {
    const existRoom = await this.prisma.room.findUnique({
      where: { id },
    });

    return this.prisma.room.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}
