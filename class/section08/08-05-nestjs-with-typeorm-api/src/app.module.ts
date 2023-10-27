import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from 'src/apis/boards/boards.module';
import { Board } from 'src/apis/boards/entities/board.entity';

@Module({
  imports: [
    BoardsModule,
    // ProductsModule,
    // UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'hugosnodejs',
      database: 'myproject',
      entities: [Board],
      synchronize: true,
      logging: true, // sql문을 보여줌
    }),
  ],
})
export class AppModule {}
