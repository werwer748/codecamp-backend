import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/commons/filter/http-exception.filter';

/*
  ? Summary#
  ? In general, the request lifecycle looks like the following:

  * Incoming request
  * Middleware
    * 2.1. Globally bound middleware
    * 2.2. Module bound middleware
  * Guards
    * 3.1 Global guards
    * 3.2 Controller guards
    * 3.3 Route guards
  * Interceptors (pre-controller)
    * 4.1 Global interceptors
    * 4.2 Controller interceptors
    * 4.3 Route interceptors
  * Pipes
    * 5.1 Global pipes
    * 5.2 Controller pipes
    * 5.3 Route pipes
    * 5.4 Route parameter pipes
  * Controller (method handler)
  * Service (if exists)
  * Interceptors (post-request)
    * 8.1 Route interceptor
    * 8.2 Controller interceptor
    * 8.3 Global interceptor
  * Exception filters
    * 9.1 route
    * 9.2 controller
    * 9.3 global
  * Server response
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 모든 요청에 대해 파이프를 적용하겠다는 의미
  app.useGlobalFilters(new HttpExceptionFilter()); // 모든 요청에 대해 필터를 적용하겠다는 의미
  await app.listen(3000);
}
bootstrap();
