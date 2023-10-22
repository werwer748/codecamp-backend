// const express = require("express"); // 옛날 방식 => CommonJS
import express from "express"; // 요즘 방식 => module
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import dotenv from "dotenv";

// const swaggerSpec = swaggerJsDoc(options);

dotenv.config();

const app = express();
app.use(cors());
/*
 * SOP 정책 (Same Origin Policy): 출처가 같은 경우에만 데이터를 주고 받을 수 있다.
 * CORS (Cross Origin Resource Sharing): 출처가 다르더라도 데이터를 주고 받을 수 있게 해주는 정책
 *  ㄴ CORS 정책을 풀어주는 미들웨어 => cors
 * preflight request: 실제 요청 전에 브라우저가 서버에게 미리 요청을 보내 조건을 확인하는 것
 * ㄴ CORS 허용이 되어있는지 METHOD 어떤것이 허용되는지 등등.. 이 후 실제 요청이 오간다.
 * ㄴ OPTIONS 메서드를 사용한다.
 * ㄴ CORS 가 거절되면 요청이 중단된다. 브라우저가 차단하는 것임.
 *
 * proxy: 프록시 서버
 * ㄴ 서버와 서버 사이에서 중계(대리인) 역할을 하는 서버
 * ㄴ preflight시 브라우저가 요청을 차단하는걸 우회하는 방법이다. 프론트 요청시 콜스영향이없는 백엔드서버로 보내고
 * 백엔드 서버에서 요청의 목적지인 서버로 요청을 보내는 것.
 *
 * 이런 불편한 CORS 정책이 존재하는 이유
 * 백엔드 리소스를 보호하기 위해서가 아닌!! 브라우저 리소스를 보호하기 위해서이다.
 * 위조된 인증 같은걸 사용해 악의적인 사용을 하는 사람들을 막기위해서 사용되는 것이다.
 * CSRF (Cross Site Request Forgery): 사이트 간 요청 위조를 방어하기 위해 사용하는 정책
 */
app.use(express.json()); // body로 들어오는 json 데이터를 읽을 수 있게 해준다. 옛날에는 bodyParser 사용
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));

app.get("/boards", function (req, res) {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  const result = [
    {
      number: 1,
      writer: "철수",
      title: "제목임당~~~",
      content: "게시글 내용 이에요~!",
    },
    {
      number: 1,
      writer: "짱구",
      title: "제목이야",
      content: "부리부리부리",
    },
    {
      number: 1,
      writer: "유리",
      title: "훈아...",
      content: "V^^...!",
    },
  ];

  // 2. DB에서 꺼내온 결과를 브라우저에 응담(response) 주기
  res.send(result);
});

app.post("/boards", function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("====================================");
  console.log(req.body);

  // 2. DB에 접속 후, 데이터를 저장 (아직은 저장했다고 가정)

  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  res.send("게시물 등록에 성공했습니다!");
});

app.post("/tokens/phone", function (req, res) {
  const { phone } = req.body;
  // 번호 자릿수 확인
  const isValid = checkPhone(phone);
  if (!isValid) return;

  // 토큰 생성
  const certToken = getToken();

  // 토큰 전송
  sendTokenToSMS(phone, certToken);

  res.send("인증완료!?");
});

app.listen(3000);
