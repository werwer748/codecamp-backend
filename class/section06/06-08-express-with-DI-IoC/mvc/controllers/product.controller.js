import { CashService } from "../services/cash.service.js";
import { ProductService } from "../services/product.service.js";

export class ProductController {
  cashService;
  ProductService;

  constructor(cashService, productService) {
    this.cashService = cashService;
    this.productService = productService;
  }

  buyProduct = (req, res) => {
    /*
     * ProductController는 CashService에 의존하고 있다. => 의존성
     * new CashService()로 불러오는 코드가 많을수록 변경해야할때 수정해야할 코드가 많아진다.
     * 매번 캐시서비스가 필요할때마다 의존성을 주입하는 것이아닌
     * 프로덕트컨트롤러가 생성될 때 의존성을 주입하면 되지않을까..? => DI(Dependency Injection)
     * 쉽게 말해서 해당 클래스 바깥에서 의존성을 만들고 생성시 주입해주는 것!
     * new 를 많이쓰면 메모리(RAM)를 많이쓰기도 하고...
     */
    // 1. 가진돈 검증하는 코드 (2줄 => 1줄)
    // const cashService = new CashService();
    // const hasMoney = cashService.checkValue();
    const hasMoney = this.cashService.checkValue();

    // 2. 판매여부 검증하는 코드 (대략 10줄 => 2줄)
    // const productService = new ProductService();
    const isSoldout = this.productService.checkSoldout();

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매에 성공");
    }
  };

  refundProduct = (req, res) => {
    // 1. 판매여부 검증하는 코드
    // const productService = new ProductService();
    const isSoldout = this.productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send("상품 환불 완료!");
    }
  };
}
