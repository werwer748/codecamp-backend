import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  //   let appService: AppService;
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // 모듈방식을 활용한 테스트
      controllers: [AppController],
      providers: [AppService],
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
