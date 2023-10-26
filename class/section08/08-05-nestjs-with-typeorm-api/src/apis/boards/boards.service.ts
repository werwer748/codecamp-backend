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
  findAll(): string {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목임당~~~',
        content: '게시글 내용 이에요~!',
      },
      {
        number: 1,
        writer: '짱구',
        title: '제목이야',
        content: '부리부리부리',
      },
      {
        number: 1,
        writer: '유리',
        title: '훈아...',
        content: 'V^^...!',
      },
    ];

    return result;
  }

  create(writer: string, title: string, contents: string): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(writer);
    console.log(title);
    console.log(contents);

    // 2. DB에 접속 후, 데이터를 저장 (아직은 저장했다고 가정)

    // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
    return '게시물 등록에 성공하였습니다.';
  }
}
