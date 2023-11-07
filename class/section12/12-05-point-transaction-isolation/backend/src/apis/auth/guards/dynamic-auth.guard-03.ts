import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// 익명 클래스가 사용 가능한 경우 => 만들자마자 바로 실행하는 경우, export default 로 선언하는 경우

const DYNAMIC_AUTH_GUARD = {
  google: new (class extends AuthGuard('google') {})(), // 만들자마자 바로 실행하는경우 익명 클래스로 만들어서 바로 실행 가능
  kakao: new (class extends AuthGuard('kakao') {})(),
  naver: new (class extends AuthGuard('naver') {})(),
}; // object literal lookup

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;

    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
