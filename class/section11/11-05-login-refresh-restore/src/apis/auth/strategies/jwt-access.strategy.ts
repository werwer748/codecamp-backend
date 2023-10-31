import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { GoogleStrategy } from 'passport-google-oauth20';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => { // 직접 입력하는 방법
      //     const temp = req.headers.Authorization; // Bearer <token>
      //     const accessToken = temp.toLowercase().replace('bearer ', '');
      //     return accessToken;
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 위의 방법을 대신하는 방법
      secretOrKey: '나의비밀번호서명',
    });
  }

  validate(payload) {
    console.log(payload); // { sub: asdasdasd(유저ID) }

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
