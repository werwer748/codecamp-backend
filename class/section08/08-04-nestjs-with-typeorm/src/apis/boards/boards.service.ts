import { Injectable, Scope } from '@nestjs/common';

/*
    ? 주입할수 있는 이라는 뜻을 가진 단어. 그러니까 주입 가능한 클래스라는 뜻

    ? @Injectable({ scope }) 인잭션-스코프 => 싱글톤(new 한 번)으로 할래? 
                                            Request 스코프(매 요청마다 new)로 할래?
                                            Transient 스코프(매 주입마다 new)로 할래?

    @Injectable 안붙여도 싱글톤으로 사용 가능함.
*/
@Injectable()
export class BoardsService {
  qqq(): string {
    return 'Hello World!';
  }
}
