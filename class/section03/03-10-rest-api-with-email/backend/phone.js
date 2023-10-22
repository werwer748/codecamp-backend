import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

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
  const messageService = new mysms(
    process.env.COOLSMS_API_KEY,
    process.env.COOLSMS_API_SECRET
  );
  messageService.sendOne({
    to: myphone,
    from: process.env.MYPHONE,
    text: `[코드캠프] 안녕하세요! 요청하신 인증번호는 ${token} 입니다.`,
  });
}
