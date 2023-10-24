// mvc 패턴 m: model, v: view, c: controller
import express from "express";

import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { CashService } from "./mvc/services/cash.service.js";
import { ProductService } from "./mvc/services/product.service.js";
import { PointService } from "./mvc/services/point.service.js";

const app = express();
/* 
    ? 의존성 주입으로 발생하는 장점
    * 1. new 한번으로 모든 곳에서 재사용(싱글톤 패턴)
    * 2. 의존성 주입으로 몽땅 한꺼번에 변경 가능
    * 3. 의존성 주입으로 쿠폰 구매 방식을 포인트 결제로 안전하게 변경 가능

    ? [부가 설명]
    * 1. ProductController가 CashService에 의존하고 있음(CashService => 의존성)
    * => 이 상황을 "강하게 결합되어 있다"라고 표현
    * => tight-coupling
    *
    * 2. 이를 개선하기 위해서 "느슨한 결합"으로 변경할 필요가 있음
    * => loose-coupling
    * => 이를 "의존성 주입"으로 해결(의존성주입: Dependency Injection 줄여서 DI)
    * => 이 역할을 대신 해주는 Nestjs 기능: IoC(Inversion of Control) 컨테이너 (알아서 new 해서 넣어주는 애다. 즉, 알아서 DI를 해줌)
    * 
    * 3. "의존성 주입"으로 싱글톤패턴 구현 가능해짐
    * => "의존성주입"이면 싱글톤패턴인가? 그건 아님..
*/
const productService = new ProductService();
const cashService = new CashService();
const pointService = new PointService();

// 상품API
const productController = new ProductController(cashService, productService); // 의존성을 밖에서 생성해서 주입해준다.
app.post("/product/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/product/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰 구매하기 API

// 게시판 API
// 있다면 게시판 컨트롤러가 들어갈듯

app.listen(3000);
