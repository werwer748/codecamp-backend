// mvc 패턴 m: model, v: view, c: controller
import express from "express";

import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";

const app = express();

// 상품API
const productController = new ProductController();
app.post("/product/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/product/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰 구매하기 API

// 게시판 API
// 있다면 게시판 컨트롤러가 들어갈듯

app.listen(3000);
