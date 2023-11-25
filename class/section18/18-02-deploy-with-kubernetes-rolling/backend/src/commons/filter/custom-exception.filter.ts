import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios'; // axios 에러를 잡고싶다면 이걸 사용한다.
import { ApolloError } from 'apollo-server-express';

/*
  여러 예외사항 처리시 매번
  throw new HttpException(
    error.response.data?.message || error.response.message, // 에러 메시지
    error.response.status || error.response.statusCode, // 에러코드
  );
  이런식으로 코드를 짜는건 비효율 적이다.
  따라서 모든 에러를 한곳에서 처리할 수 있도록 코드를 수정.
*/

// @Catch(HttpException)
@Catch()
// implements => class의 모양을 강제함.
// export class HttpExceptionFilter implements ExceptionFilter {
export class CustomExceptionFilter implements ExceptionFilter {
  // catch(exception: HttpException) {
  catch(exception: unknown) {
    // const status = exception.getStatus();
    // const message = exception.message; => 기존 Http

    // default 예외 시
    const error = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '예외가 발생했어요!',
    };

    if (exception instanceof HttpException) {
      // Http 예외 시
      error.status = exception.getStatus();
      error.message = exception.message;
    } else if (exception instanceof AxiosError) {
      // Axios 예외 시
      error.status = exception.response.status;
      error.message = exception.response.data.message;
    }

    console.log('===================');
    console.log('예외 발생');
    console.log('예외내용: ', error.message);
    console.log('예외코드: ', error.status);
    console.log('===================');

    // console.log('에러전송');
    // ApolloError => graphql 에러를 전송하기 위한 에러
    throw new ApolloError(error.message, error.status.toString());
  }
}
