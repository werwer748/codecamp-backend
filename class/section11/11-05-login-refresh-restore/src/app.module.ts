import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from 'src/apis/boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/apis/products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ProductsCategoriesModule } from 'src/apis/productsCategories/productsCategories.module';
import { UsersModule } from 'src/apis/users/users.module';
import { AuthModule } from 'src/apis/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    ProductsModule,
    ProductsCategoriesModule,
    UsersModule,
    ConfigModule.forRoot(), // process.env보다 먼저 실행되어야 함
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }), // req는 기본적으로 들어오지만 res는 이걸 작성해야만 들어오기 떄문.
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      /*
       * __dirname: 현재 실행중인 파일의 절대경로 (프로젝트 루트 경로)
       * '/apis/': src/apis/ 폴더
       * '**': 모든 폴더 - 폴더안에 폴더 폴더안에 폴더 전부 순회
       * '*.entity.*': 파일명이 entity.*로 끝나는 모든 파일 => dist 폴더가 실행되는 것이기 때문에 .js로 끝나는 파일이나 확장자와 관계없이 entity.* 로 끝나는 파일을 모두 읽어옴
       */
      synchronize: true,
      logging: true, // sql문을 보여줌
    }),
  ],
})
export class AppModule {}