import { IsNotEmpty, Matches } from 'class-validator';

export class CreateReserveDto {
    @IsNotEmpty({ message: 'O campo nome é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'A data de início é obrigatória' })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d{3})?Z?$/, {
        message: 'A data de início deve estar no formato AAAA-MM-DDTHH:mm'
    })
    dateInit: string;

    @IsNotEmpty({ message: 'A data de término é obrigatória' })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d{3})?Z?$/, {
        message: 'A data de término deve estar no formato AAAA-MM-DDTHH:mm'
    })
    dateEnd: string;

    @IsNotEmpty({ message: 'O campo sala é obrigatório' })
    room_id: number;

    @IsNotEmpty({ message: 'O campo usuário é obrigatório' })
    user_id: number;
}