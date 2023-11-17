// rest api => controller
// graphql => resolver
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardsService } from 'src/apis/boards/boards.service';
import { CreateBoardInput } from 'src/apis/boards/dto/create-board.input';
import { Board } from 'src/apis/boards/entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService,

    @Inject(CACHE_MANAGER) // cacheManager: Cache
    private readonly cacheManager: Cache,
  ) {}

  // [Board]: graphql에서 사용하는 배열 타입
  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    // 1. 캐시에서 조회하는 연습 - 레디스
    // const mycache = await this.cacheManager.get('qqq');
    // console.log(mycache);

    // 2. 조회완료 메시지 전달 - 레디스
    // return '캐시에서 조회 완료!';
    return this.boardsService.findAll(); // 레디스 하는동안 주석
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string, // 옵셔널 ({ name: '컬럼명', nullable: true })
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    // 1. 캐시에 등록하는 연습
    // await this.cacheManager.set('qqq', createBoardInput, { ttl: 5 });

    // 2. 등록완료 메시지 전달 - 레디스
    // return '캐시에 등록 완료!';
    return this.boardsService.create({ createBoardInput }); // 레디스 하는동안 주석
  }
}
