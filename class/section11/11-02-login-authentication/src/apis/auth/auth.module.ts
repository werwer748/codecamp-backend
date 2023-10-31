import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from 'src/apis/auth/auth.resolver';
import { AuthService } from 'src/apis/auth/auth.service';
import { UsersModule } from 'src/apis/users/users.module';

@Module({
  imports: [
    JwtModule.register({}), // jwt사용법
    // TypeOrmModule.forFeature([
    //   User, // usersService를 가져와서 사용하는데 usersService에서 유저 레포지토리를 사용중이기 떄문
    // ]),
    UsersModule,
    // 위처럼 할 경우 프로젝트가 커지면서 헷갈릴수 있어서 한번에 가져오도록 할 수 있음
  ],
  providers: [
    AuthResolver, //
    AuthService,
    // UsersService, // UsersModule에 담겨 왔기 때문에 여기서는 제거
  ],
})
export class AuthModule {}
