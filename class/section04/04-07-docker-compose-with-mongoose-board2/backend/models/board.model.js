import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String,
});

export const Board = mongoose.model("Board", boardSchema);
/*
정의 되지 않은 값이 들어가지 않도록 하는 방어막 용도이다.
실제적으로 mongoDB와 상관 없음.

스키마리스인 mongoDB의 특성상, 정의되지 않은 값이 들어가도 에러가 나지 않는다.
__v 는 몽구스를 통해서 생성되는 필드이다.

new Board({
  writer,
  title,
  contents,
  age <= 없어짐
})
*/
