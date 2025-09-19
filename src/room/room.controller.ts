import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/room-create.dto';

@Controller('salas')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAll() {
    return this.roomService.getAll();
  }

  @Post()
  async create(@Body() data: CreateRoomDto) {
    return this.roomService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateRoomDto) {
    return this.roomService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.roomService.delete(+id);
  }
}
