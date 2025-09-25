import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReserveDto } from './dto/create-reserve.dto';

@Injectable()
export class ReserveService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateReserveDto) {
    // Garantir que as datas sejam tratadas como UTC
    const dateInit = new Date(data.dateInit);
    const dateEnd = new Date(data.dateEnd);
    const now = new Date();
    const roomId = Number(data.room_id);

    console.log('Datas recebidas:', {
      dateInit: data.dateInit,
      dateEnd: data.dateEnd,
      dateInitParsed: dateInit.toISOString(),
      dateEndParsed: dateEnd.toISOString(),
    });

    // Validação de datas válidas
    if (isNaN(dateInit.getTime()) || isNaN(dateEnd.getTime())) {
      throw new BadRequestException('Formato de data inválido');
    }

    // 1. Validação de Tempo: fim deve ser após início
    if (dateEnd <= dateInit) {
      throw new BadRequestException(
        'A data de término deve ser posterior à data de início',
      );
    }

    // 2. Reservas no Passado: permitir margem de 1 minuto para evitar problemas de timezone
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    if (dateInit < oneMinuteAgo) {
      throw new BadRequestException('Não é possível criar reservas no passado');
    }

    // 3. Sem Conflitos: verificar sobreposição na mesma sala
    const conflictingReserve = await this.prisma.reserve.findFirst({
      where: {
        room_id: roomId,
        OR: [
          {
            AND: [
              { dateInit: { lte: dateInit } },
              { dateEnd: { gt: dateInit } },
            ],
          },
          {
            AND: [{ dateInit: { lt: dateEnd } }, { dateEnd: { gte: dateEnd } }],
          },
          {
            AND: [
              { dateInit: { gte: dateInit } },
              { dateEnd: { lte: dateEnd } },
            ],
          },
        ],
      },
    });

    if (conflictingReserve) {
      throw new BadRequestException(
        'A sala já está reservada para este período',
      );
    }

    return this.prisma.reserve.create({
      data: {
        name: data.name,
        dateInit,
        dateEnd,
        room_id: roomId,
        user_id: Number(data.user_id),
      },
    });
  }

  async getAll() {
    return this.prisma.reserve.findMany({
      include: {
        room: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, data: CreateReserveDto) {
    return this.prisma.reserve.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.reserve.delete({
      where: {
        id,
      },
    });
  }
}
