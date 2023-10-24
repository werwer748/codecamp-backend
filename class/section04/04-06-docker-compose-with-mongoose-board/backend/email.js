import * as nodemailer from "nodemailer";
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
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 500px;">
                  <h1>${name}님 가입을 환영합니다!!</h1>
                  <hr />
                  <div style="color: red;">이름: ${name}</div>
                  <div>나이: ${age}</div>
                  <div>학교: ${school}</div>
                  <div>가입일: ${today}</div>
                </div>
              </div>
            </body>
        </html>
      `;

  return mytemplate;
}

export async function sendTemplateToEmail(email, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAILER_USER,
    to: email,
    subject: "가입을 환영합니다!",
    html: template,
  });
  // console.log(`${email} 이메일로 가입환영 템플릿 "${template}"을 전송합니다.`);
}
