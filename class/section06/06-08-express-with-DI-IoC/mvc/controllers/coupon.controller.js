import { CashService } from "../services/cash.service.js";

export class CouponController {
  cashService;

  constructor(cashService) {
    this.cashService = cashService;
  }

  buyCoupon = (req, res) => {
    // 1. 가진돈을 검증하는 코드
    // const cashService = new CashService(); // 강하게 의존하고 있다 => tight coupling
    const hasMoney = this.cashService.checkValue(); // 약한 결합(느슨한겨합) => loose coupling

    // 2. 쿠폰을 구매하는 코드
    if (hasMoney) {
      res.send("상품권 구매 완료!");
    }
  };
}
