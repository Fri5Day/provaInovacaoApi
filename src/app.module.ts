import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { ReserveModule } from './reserve/reserve.module';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    UserModule,
    RoomModule,
    ReserveModule,
  ],
  controllers: [],
})
export class AppModule {}
