import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import {
  IIamportServiceCancel,
  IIamportServiceCheckPaid,
} from 'src/apis/iamport/interfaces/iamport-service.interface';

@Injectable()
export class IamportService {
  async getToken(): Promise<string> {
    const result = await axios.post(`https://api.iamport.kr/users/getToken`, {
      imp_key: process.env.IMP_REST_API_KEY,
      imp_secret: process.env.IMP_REST_API_SECRET,
    });
    return result.data.response.access_token;
  }

  async checkPaid({ impUid, amount }: IIamportServiceCheckPaid): Promise<void> {
    // try { http에러와 axios 에러를 통합으로 http-excetion.filter에서 잡기 때문에 try catch를 사용할 필요가 없다.
    const token = await this.getToken();

    const result = await axios.get(
      `https://api.iamport.kr/payments/${impUid}`, // => AxiosError
      { headers: { Authorization: token } },
    );

    if (amount !== result.data.response.amount) {
      throw new UnprocessableEntityException('잘못된 결제 정보입니다.'); // => HttpException
    }
  }

  async cancel({ impUid }: IIamportServiceCancel): Promise<number> {
    const token = await this.getToken();
    const result = await axios.post(
      'https://api.iamport.kr/payments/cancel',
      { imp_uid: impUid },
      { headers: { Authorization: token } },
    );
    return result.data.response.cancel_amount;
  }
}
