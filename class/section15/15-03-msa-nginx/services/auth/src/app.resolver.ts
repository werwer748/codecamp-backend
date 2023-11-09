import { Mutation, Query, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';
// import { Controller, Get } from '@nestjs/common';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Mutation(() => String)
  login() {
    return 'accessToken';
  }

  @Query(() => String) // mutation이 작동하기 위해서는 query가 최소 하나 필요하다.
  hello() {
    return 'hello';
  }
}
