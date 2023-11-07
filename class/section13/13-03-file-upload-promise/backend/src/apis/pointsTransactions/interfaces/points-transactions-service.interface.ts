import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from 'src/apis/pointsTransactions/entities/pointTransaction.entity';
import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPointsTransactionsServiceFindOneByImpUid {
  impUid: string;
}

export interface IPointsTransactionsServiceCheckDuplication {
  impUid: string;
}

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
  status?: POINT_TRANSACTION_STATUS_ENUM;
}

export interface IPointsTransactionsServiceCreateForPayment {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceFindByImpAndUser {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPointsTransactionsServiceCheckAlreadyCanceled {
  pointTransactions: PointTransaction[];
}

export interface IPointsTransactionsServiceCheckHasCancelablePoint {
  pointTransactions: PointTransaction[];
}

export interface IPointsTransactionsServiceCancel {
  impUid: string;
  user: IAuthUser['user'];
}
