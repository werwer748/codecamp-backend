// const express = require("express"); // 옛날 방식 => CommonJS
import express from "express"; // 요즘 방식 => module
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

//import abcdedfg from "express"; // export default 가져오기 => 정상 작동 함
/*
? sendTokenToSMS 에 export default 적용한 경우
* import abcdefg, { checkPhone as zzz, getToken } from "express"; 
* export default 와 export를 함께 쓰는 방법
*/
/*
 ? 한번에 가져오기
 * import * as phone from "./phone.js";
    * phone.checkPhone();
    * phone.getToken();
    * phone.sendTokenToSMS();
*/

const app = express();

app.use(express.json()); // body로 들어오는 json 데이터를 읽을 수 있게 해준다. 옛날에는 bodyParser 사용

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
