import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

class MockAppService {
  getHello(): string {
    return '나는 가짜다!';
  }
}

describe('AppController', () => {
  //   let appService: AppService;
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // 모듈방식을 활용한 테스트
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService, // 컨트롤러의 앱서비스자리에 다른걸 넣어주고싶으면 여기를 수정
        }, // 프로바이더에 등록되는 클래스 원형
      ],
    }).compile();

    app.get(AppController);

    // appService = new AppService();
    appController = app.get<AppController>(AppController);
  });
  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  //   describe('fetchBoards 테스트하기', () => {});
  //   describe('createBoard 테스트하기', () => {});
});
