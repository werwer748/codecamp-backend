// rest api => controller
// graphql => resolver
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from 'src/apis/boards/boards.service';
import { CreateBoardInput } from 'src/apis/boards/dto/create-board.input';
import { Board } from 'src/apis/boards/entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  // [Board]: graphql에서 사용하는 배열 타입
  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string, // 옵셔널 ({ name: '컬럼명', nullable: true })
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardsService.create({ createBoardInput });
  }
}
