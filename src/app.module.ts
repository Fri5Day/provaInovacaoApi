import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule ),
    forwardRef(() => UserModule ), 
    RoomModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
