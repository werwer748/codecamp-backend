import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
  getHello가 돌아가는 동안 qqq2 호출시 같이 팬딩걸림
  싱글스레드여서 발생하는 문제
  */
  @Get('/qqq') // endpoint
  getHello(): string {
    let sum = 0;
    for (let i = 0; i <= 9000000000; i++) {
      sum += 1;
    }

    return '철수 성공!!';
  }

  @Get('/qqq2') // endpoint
  getHello2(): string {
    return '영희 성공!!';
  }
}
