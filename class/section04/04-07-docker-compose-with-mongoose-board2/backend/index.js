import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { options } from "./swagger/config.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import { Board } from "./models/board.model.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));

app.get("/boards", async function (req, res) {
  // const result = [
  //   {
  //     number: 1,
  //     writer: "철수",
  //     title: "제목임당~~~",
  //     content: "게시글 내용 이에요~!",
  //   },
  //   {
  //     number: 1,
  //     writer: "짱구",
  //     title: "제목이야",
  //     content: "부리부리부리",
  //   },
  //   {
  //     number: 1,
  //     writer: "유리",
  //     title: "훈아...",
  //     content: "V^^...!",
  //   },
  // ];
  // 1. DB에 접속 후, 데이터를 조회
  const result = await Board.find();

  // 2. DB에서 꺼내온 결과를 브라우저에 응담(response) 주기
  res.send(result);
});

app.post("/boards", async function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("==============리프레시확인ㅇ!===================");
  console.log(req.body);
  const { writer, title, contents } = req.body;

  // 2. DB에 접속 후, 데이터를 저장
  const board = new Board({
    writer,
    title,
    contents,
  });
  await board.save();

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

app.post("/users", function (req, res) {
  const { name, age, school, email } = req.body;

  // 1. 이메일이 정상인지 확인(1-존재여부, 2="@" 포함여부
  const isValid = checkEmail(email);

  if (isValid === false) return;

  // 2. 가입환영 템플릿
  const template = getWelcomeTemplate({ name, age, school });

  // 3. 이메일에 가입환영 템플릿전송하기
  sendTemplateToEmail(email, template);

  res.send("가입완료");
});

mongoose.set("debug", true);

mongoose
  .connect("mongodb://my-database:27017/mydocker")
  .then(() => console.log("MongoDB 접속 성공"))
  .catch(() => console.log("MongoDB 접속 실패"));

app.listen(4000, () => {
  console.log("4000번 포트에서 대기중...");
});
