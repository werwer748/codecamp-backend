import { Module } from '@nestjs/common';
import { BoardsService } from 'src/apis/boards/boards.service';
import { BoardsResolver } from 'src/apis/boards/boards.resolver';

@Module({
  imports: [],
  providers: [
    BoardsResolver, //
    BoardsService,
  ],
})
export class BoardsModule {}
