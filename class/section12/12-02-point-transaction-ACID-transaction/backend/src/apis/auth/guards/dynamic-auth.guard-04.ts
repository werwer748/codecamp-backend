import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// 익명 클래스가 사용 가능한 경우 => 만들자마자 바로 실행하는 경우, export default 로 선언하는 경우

const DYNAMIC_AUTH_GUARD = ['google', 'kakao', 'naver'].reduce((prev, curr) => {
  const result = {
    ...prev,
    [curr]: new (class extends AuthGuard(curr) {})(),
  };

  return result;
}, {});

// 1단계 - 빈객체 만들기
// {
//
// }

// 2단계 - 빈객체에 google 속성 추가하기
/*
  {
    google: new (class extends AuthGuard('google') {})(),
  }
*/

// 3단계 - 객체에 kakao 속성 추가하기
/*
  {
    google: new (class extends AuthGuard('google') {})(),
    kakao: new (class extends AuthGuard('kakao') {})(),
  }
*/

// 4단계 - 객체에 naver 속성 추가하기
/*
  {
    google: new (class extends AuthGuard('google') {})(),
    kakao: new (class extends AuthGuard('kakao') {})(),
    naver: new (class extends AuthGuard('naver') {})(),
  }
*/

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;

    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
