// rest api => controller
// graphql => resolver
import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from 'src/apis/boards/boards.service';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => String, { nullable: true })
  fetchBoards(): string {
    return this.boardsService.qqq();
  }
}
