import { Mutation, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';
// import { Controller, Get } from '@nestjs/common';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Mutation(() => String)
  login() {
    return 'accessToken';
  }
}
