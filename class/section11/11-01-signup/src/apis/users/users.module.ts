import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { UsersResolver } from 'src/apis/users/users.resolver';
import { UsersService } from 'src/apis/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
  exports: [],
})
export class UsersModule {}
