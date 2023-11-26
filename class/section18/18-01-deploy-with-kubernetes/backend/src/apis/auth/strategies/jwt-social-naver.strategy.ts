import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver-v2';

export class JwtNavertrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['email', 'name'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('accessToken::: ', accessToken);
    console.log('refreshToken::: ', refreshToken);
    console.log('profile:::', profile);

    // strategy - validate를 통한 return 값은 req.user에 담긴다.
    return {
      name: profile.name,
      email: profile.email,
      password: '1234',
      age: 0,
    };
  }
}
