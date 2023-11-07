import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from 'src/apis/auth/auth.service';
import { DynamicAuthGuard } from 'src/apis/auth/guards/dynamic-auth.guard-04';
import { IOAuthUser } from 'src/apis/auth/interfaces/auth-service.interface';
import { UsersService } from 'src/apis/users/users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/:social')
  // @UseGuards(AuthGuard('google')) // UseGuards => AuthGuard => canActivate 순으로 실행 됨
  @UseGuards(DynamicAuthGuard) // canActivate가 실행 되는 것을 활용하여, 동적으로 AuthGuard를 선택할 수 있음
  loginOAuth(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.loginOAuth({ req, res });
  }

  // @UseGuards(AuthGuard('kakao'))
  // @Get('/login/kakao')
  // loginOAuth(@Req() req: Request & IOAuthUser, @Res() res: Response) {
  //   return this.authService.loginOAuth({ req, res });
  // }

  // @UseGuards(AuthGuard('naver'))
  // @Get('/login/naver')
  // loginOAuth(@Req() req: Request & IOAuthUser, @Res() res: Response) {
  //   return this.authService.loginOAuth({ req, res });
  // }
}
