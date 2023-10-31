import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
// implements => class의 모양을 강제함.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('===================');
    console.log('예외 발생');
    console.log('예외내용: ', message);
    console.log('예외코드: ', status);
    console.log('===================');
  }
}
