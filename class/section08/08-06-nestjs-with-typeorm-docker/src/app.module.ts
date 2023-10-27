import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from 'src/apis/boards/boards.module';
import { Board } from 'src/apis/boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BoardsModule,
    // ProductsModule,
    // UsersModule,
    ConfigModule.forRoot(), // process.env보다 먼저 실행되어야 함
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [Board],
      synchronize: true,
      logging: true, // sql문을 보여줌
    }),
  ],
})
export class AppModule {}
