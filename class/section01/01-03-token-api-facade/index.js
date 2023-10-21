//* 퍼사드 패턴(facade Pattern)을 사용하여 리팩토링
function checkPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("전화번호 제대로 입력해주세요~");
    //? return 함수를 종료, 단 자신이 속한 함수를 종료하는 것.
    return false;
  }
  return true;
}

function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return token;
}

function sendTokenToSMS(myphone, token) {
  console.log(`${myphone}에게 인증번호 "${token}"을/를 전송했습니다.`);
}

function createTokenOfPhone(myphone) {
  // 번호 자릿수 확인
  const isValid = checkPhone(myphone); //* 함수명, 변수명 자체가 주석의 역할도 겸할수 있도록 해야한다.
  if (!isValid) return; // 한줄일때 중괄호 생략 가능

  // 토큰 생성
  const certToken = getToken();

  // 토큰 전송
  sendTokenToSMS(myphone, certToken);
}

createTokenOfPhone("01012345678"); // 인자(argumen
