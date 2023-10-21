function createTokenOfPhone(qqq) {
  // qqq: 매개변수(parameter)

  // 1. 전화번호 자릿수 확인 (10~11)
  if (qqq.length < 10 || qqq.length > 11) {
    console.log("전화번호 제대로 입력해주세요~");
    return;
  }
  // 2. 핸드폰 토큰 6자리 만들기
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");

  // 3. 핸드폰에 토큰 전송하기
  console.log(`${qqq}에게 인증번호 "${token}"을/를 전송했습니다.`);
}

createTokenOfPhone("01012345678"); // 인자(argument)
