// mvc 패턴 m: model, v: view, c: controller
import express from "express";

import { ProductController } from "./mvc/controllers/product.controller.js";

const app = express();

// 상품API
const productController = new ProductController();
app.post("/product/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/product/refund", productController.refundProduct); // 상품 환불하기 API

// 게시판 API
// 있다면 게시판 컨트롤러가 들어갈듯

/*
 * 공통된 기능을 함수로 빼서 사용할 수도 있지만,
 * 공통되는 기능들을 그룹핑한 클래스를 만들어서 사용하는 방법도 있다.
 */

app.listen(3000);
