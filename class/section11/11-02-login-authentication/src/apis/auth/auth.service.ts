import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/apis/users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from 'src/apis/auth/interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!user) {
      // 배포시 500으로 에러 통일한다고 함.
      throw new UnprocessableEntityException('존재하지 않는 유저입니다.');
    }

    // 3. 일치하는 유저가 있지만, 비밀번호가 일치하지 않으면 에러 던지기
    const isAuth = bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    }

    // 4. 일치하는 유저도 있고, 비밀번호도 맞았다면?!
    // => accessToken(=JWT)을 만들어서 브라우저에 전달!
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id }, //
      { secret: '나의비밀번호서명', expiresIn: '1h' },
    );
  }
}
