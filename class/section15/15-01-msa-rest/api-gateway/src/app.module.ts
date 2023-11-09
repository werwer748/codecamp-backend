import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        // auth-service
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          // 게이트웨이와 서비스를 똑같이 입력
          host: 'auth-service',
          port: 3001,
        },
      },
      {
        name: 'RESOURCE_SERVICE',
        transport: Transport.TCP,
        options: {
          // 게이트웨이와 서비스를 똑같이 입력
          host: 'resource-service',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
