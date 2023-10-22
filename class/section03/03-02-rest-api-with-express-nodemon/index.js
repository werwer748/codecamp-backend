// const express = require("express"); // 옛날 방식 => CommonJS
import express from "express"; // 요즘 방식 => module
const app = express();

app.get("/", function (req, res) {
  // get 방식의 api를 만들겠다.
  res.send("Hello World");
}); // 이 함수를 미들웨어 함수라고 한다.

app.get("/qqq", function (req, res) {
  res.send("asdfasdfasdf");
});

app.listen(3000);
/*
    ? listen은 요청을 기다린다는 뜻
    ? 3000 => 포트 번호
*/
