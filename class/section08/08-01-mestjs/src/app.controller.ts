import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/products/buy') // endpoint
  getHello(): string {
    const qqq = 3;
    console.log(qqq);

    const profile = {
      age: 13,
      school: '다람쥐초등학교',
    };

    return this.appService.qqq();
  }
}
