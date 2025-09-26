import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  role?: string;
}