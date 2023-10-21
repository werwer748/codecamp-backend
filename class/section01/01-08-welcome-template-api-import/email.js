import { getToday } from "./utils.js";

export function checkEmail(email) {
  if (email === undefined || email.includes("@") === false) {
    console.log("이메일 주소가 정확하지 않아요!");
    return false;
  }
  return true;
}

export function getWelcomeTemplate({ name, age, school }) {
  // destructuring

  const today = getToday();

  const mytemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${today}</div>
            </body>
        </html>
      `;

  return mytemplate;
}

export function sendTemplateToEmail(email, template) {
  console.log(`${email} 이메일로 가입환영 템플릿 "${template}"을 전송합니다.`);
}
