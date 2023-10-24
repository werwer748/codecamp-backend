import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

// 상품 구매하기 API
app.post("/product/buy", (req, res) => {
  // 1. 가진돈 검증하는 코드 (대략 10줄 => 2줄)
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();

  // 2. 판매여부 검증하는 코드 (대략 10줄 => 2줄)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();

  // 3. 상품 구매하는 코드
  if (hasMoney && !isSoldout) {
    res.send("상품 구매에 성공");
  }
});

// 상품 환불하기 API
app.post("/product/refund", (req, res) => {
  // 1. 판매여부 검증하는 코드
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();

  // 2. 상품 환불하는 코드
  if (isSoldout) {
    res.send("상품 환불 완료!");
  }
});

/*
 * 공통된 기능을 함수로 빼서 사용할 수도 있지만,
 * 공통되는 기능들을 그룹핑한 클래스를 만들어서 사용하는 방법도 있다.
 */

app.listen(3000);
