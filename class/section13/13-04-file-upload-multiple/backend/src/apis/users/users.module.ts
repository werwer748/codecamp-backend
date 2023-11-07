import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { UsersResolver } from 'src/apis/users/users.resolver';
import { UsersService } from 'src/apis/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
  exports: [
    UsersService,
    // 다른 모듈에서 UsersService를 사용할 수 있도록 export
    // UsersModule 상자를 내보낼때 UsersService을 담아서 내보낸다고 생각하면 됨
  ],
})
export class UsersModule {}
