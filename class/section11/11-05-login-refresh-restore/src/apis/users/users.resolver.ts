import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/apis/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from 'src/apis/auth/guards/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  // @UseGuards(AuthGuard('나만의인가')) //'access'를 통해 전략을 구분한다, rest-api 방식
  @UseGuards(GqlAuthGuard('access')) //'access'를 통해 전략을 구분한다, rest-api 방식
  @Query(() => String)
  fetchUser(
    @Context() context: IContext, //
  ): string {
    // console.log('=================');
    console.log(context.req.user);
    // console.log('=================');
    return '인가에 성공하였습니다.';
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }
}
