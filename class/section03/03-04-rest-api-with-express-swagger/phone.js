export function checkPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("전화번호 제대로 입력해주세요~");
    //? return 함수를 종료, 단 자신이 속한 함수를 종료하는 것.
    return false;
  }
  return true;
}

export function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return token;
}

export function sendTokenToSMS(myphone, token) {
  console.log(`${myphone}에게 인증번호 "${token}"을/를 전송했습니다.`);
}
// export default function sendTokenToSMS(myphone, token) {
//   console.log(`${myphone}에게 인증번호 "${token}"을/를 전송했습니다.`);
// }
/*
 * export default
 * - 파일에서 한 번만 사용 가능
 * - import 할 때 이름을 마음대로 정할 수 있다.
 * - export default로 내보낸 것은 import 할 때 {} 없이 사용 가능
 */
