import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsTransactionsResolver } from './pointsTransactions.resolver';
import { PointsTransactionsService } from './pointsTransactions.service2';
import { PointTransaction } from './entities/pointTransaction.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { IamportService } from 'src/apis/iamport/iamport.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
  ],
  providers: [
    PointsTransactionsResolver, //
    PointsTransactionsService,
    IamportService,
  ],
})
export class PointsTransactionsModule {}
