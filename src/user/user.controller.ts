import { Controller, Get, Post, Delete, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorators';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard)
//@Roles(Role.ADMIN)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(+id);
  }
}
