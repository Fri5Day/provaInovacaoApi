import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'A quantidade suportada da sala é obrigatória' })
  size: number;

  @IsOptional()
  note: string;

  @IsInt()
  user_id: number;
}
