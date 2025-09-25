import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { AuthGuard } from 'src/guards/auth.guard';

//@UseGuards(AuthGuard)
@Controller('reservas')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Get()
  async getAll() {
    return this.reserveService.getAll();
  }

  @Post()
  async create(@Body() data: CreateReserveDto) {
    return this.reserveService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateReserveDto) {
    return this.reserveService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.reserveService.delete(+id);
  }
}
