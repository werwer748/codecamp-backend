import { Field, InputType } from '@nestjs/graphql';

@InputType() // 입력받는 타입.. => input CreateBoardInput {}
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
