import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { GoogleStrategy } from 'passport-google-oauth20';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      // header에서 쿠키를 가져오는 함수는 제공되지 않기때문에 직접 작성
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; // refreshToken=어쩌구어쩌구...
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: '나의리프레시비밀번호서명',
    });
  }

  validate(payload) {
    console.log(payload);

    return {
      // req.user라는 키를 만들고 그 안에 값을 넣어준다.
      /*
      req {
        ...,
        user: {
          id: asdasdasd(유저ID),
        }
      }
      */
      id: payload.sub,
    };
  }
}
