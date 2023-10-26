// rest api => controller
// graphql => resolver
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from 'src/apis/boards/boards.service';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => String, { nullable: true })
  fetchBoards(): string {
    return this.boardsService.findAll();
  }

  @Mutation()
  createBoard(
    @Args('writer') writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
  ): string {
    return this.boardsService.create(writer, title, contents);
  }
}
