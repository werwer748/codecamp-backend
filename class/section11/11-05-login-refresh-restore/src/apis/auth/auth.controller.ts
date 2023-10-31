import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from 'src/apis/auth/auth.service';
import { UsersService } from 'src/apis/users/users.service';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
    age: number;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    // 프로필을 받아온 다음, 로그인 처리해야 하는 곳.
    // 1. 회원 조회
    let user = await this.usersService.findOneByEmail({
      email: req.user.email,
    });

    // 2. 회원가입이 안되어있다면 자동으로 회원가입
    if (!user) {
      user = await this.usersService.create({
        ...req.user,
      });
    }

    // 3. 회원가입이 돼있다면? 로그인(accessToken, refreshToken 만들어서 브라우저에 전송)
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/class/section11/frontend/social-login.html',
    );
  }
}
