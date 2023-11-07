import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

export class JwtKakaotrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('accessToken::: ', accessToken);
    console.log('refreshToken::: ', refreshToken);
    console.log('profile:::', profile._json);

    // strategy - validate를 통한 return 값은 req.user에 담긴다.
    return {
      name: profile.displayName,
      email: profile._json.kakao_account.email,
      password: '1234',
      age: 0,
    };
  }
}
