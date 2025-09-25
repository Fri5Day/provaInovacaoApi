import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'A quantidade suportada da sala é obrigatória' })
  size: number;

  @IsOptional()
  note: string;

  @IsNotEmpty({ message: 'O usuário é obrigatório' })
  user_id: number;
}
