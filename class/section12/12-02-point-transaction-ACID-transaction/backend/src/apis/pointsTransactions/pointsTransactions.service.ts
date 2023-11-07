import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import {
  IPointsTransactionsServiceCancel,
  IPointsTransactionsServiceCheckAlreadyCanceled,
  IPointsTransactionsServiceCheckDuplication,
  IPointsTransactionsServiceCheckHasCancelablePoint,
  IPointsTransactionsServiceCreate,
  IPointsTransactionsServiceCreateForPayment,
  IPointsTransactionsServiceFindByImpAndUser,
  IPointsTransactionsServiceFindOneByImpUid,
} from './interfaces/points-transactions-service.interface';
import { User } from 'src/apis/users/entities/user.entity';
import { IamportService } from 'src/apis/iamport/iamport.service';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly iamportService: IamportService,

    private readonly dataSource: DataSource, // 트랜잭션을 위한 데이터소스
  ) {}

  findOneByImpUid({
    impUid,
  }: IPointsTransactionsServiceFindOneByImpUid): Promise<PointTransaction> {
    return this.pointsTransactionsRepository.findOne({ where: { impUid } });
  }

  async checkDuplication({
    impUid,
  }: IPointsTransactionsServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록된 결제 ID입니다.');
  }

  async create({
    impUid,
    amount,
    user: _user,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    const queryRunner = this.dataSource.createQueryRunner(); // datasource를 통해 queryRunner를 생성
    await queryRunner.connect(); // queryRunner를 db에 연결
    await queryRunner.startTransaction(); // 트랜잭션 시작

    try {
      // 1. PointTransaction 테이블에 거래기록 한줄 생성
      const pointTransction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status,
      });
      // await this.pointsTransactionsRepository.save(pointTransction);
      await queryRunner.manager.save(pointTransction); // queryRunner를 통해 save(임시저장)

      // throw new Error('예기치못한 실패!!');

      // 2. 유저의 돈 찾아오기 - 원래대로면 유저서비스를 타고가는게 맞지만 진행될 수업을 위해 일단 여기서 처리
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
      }); // queryRunner를 통해 조회

      // 3. 유저의 돈 업데이트
      const updatedUser = await this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      // {
      //   id: _user.id,
      // },
      // {
      //   point: user.point + amount,
      // },
      await queryRunner.manager.save(updatedUser); // queryRunner를 통해 save(임시저장)
      await queryRunner.commitTransaction(); // 트랜잭션 커밋

      // 4. 최종결과 브라우저에 돌려주기
      return pointTransction;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 트랜잭션 롤백
    } finally {
      await queryRunner.release(); // queryRunner db연결 해제
      // release가 없으면 commit이 끝나도 커넥션이 안끊겨서 문제가 된다. (에러나면 자동으로 끊기긴함..)
    }
  }

  async createForPayment({
    impUid,
    amount,
    user,
  }: IPointsTransactionsServiceCreateForPayment): Promise<PointTransaction> {
    // this.pointsTransactionsRepository.create() - db에 갔다올 필요가 없음 => 등록을 위한 빈객체 생성
    // this.pointsTransactionsRepository.insert() => 결과는 못받는 등록 방법
    // this.pointsTransactionsRepository.update() => 결과는 못받는 수정 방법

    // 결제 완료 상태인지 검증하기
    await this.iamportService.checkPaid({ impUid, amount });
    // 이미 결제됐던 id인지 검증하기
    await this.checkDuplication({ impUid });

    return this.create({
      impUid,
      amount,
      user,
    });
  }

  findByImpUidAndUser({
    impUid,
    user,
  }: IPointsTransactionsServiceFindByImpAndUser): Promise<PointTransaction[]> {
    return this.pointsTransactionsRepository.find({
      where: { impUid, user: { id: user.id } },
      relations: ['user'],
    });
  }

  checkAlreadyCanceled({
    pointTransactions,
  }: IPointsTransactionsServiceCheckAlreadyCanceled): void {
    const canceledPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    );
    if (canceledPointTransactions.length) {
      throw new ConflictException('이미 취소된 결제ID입니다.');
    }
  }

  checkHasCancelablePoint({
    pointTransactions,
  }: IPointsTransactionsServiceCheckHasCancelablePoint): void {
    const paidPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    );
    if (!paidPointTransactions.length) {
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');
    }
    if (paidPointTransactions[0].user.point < paidPointTransactions[0].amount) {
      throw new UnprocessableEntityException('포인트가 부족합니다.');
    }
  }

  async cancel({
    impUid,
    user,
  }: IPointsTransactionsServiceCancel): Promise<PointTransaction> {
    // 결제내역 조회하기
    const pointTransactions = await this.findByImpUidAndUser({ impUid, user });

    // 이미 취소됐던 id인지 검증하기
    this.checkAlreadyCanceled({ pointTransactions });
    // 포인트가 취소하기에 충분히 있는지 검증하기
    this.checkHasCancelablePoint({ pointTransactions });

    // 결제 취소하기
    const canceledAmount = await this.iamportService.cancel({ impUid });

    // 취소된 결과 등록하기
    return this.create({
      impUid,
      amount: -canceledAmount,
      user,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
  }
}
