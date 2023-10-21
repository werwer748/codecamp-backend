function checkEmail(email) {
  if (email === undefined || email.includes("@") === false) {
    console.log("이메일 주소가 정확하지 않아요!");
    return false;
  }
  return true;
}

function getWelcomeTemplate({ name, age, school, createdAt }) {
  // destructuring
  const mytemplate = `
      <html>
          <body>
              <h1>${name}님 가입을 환영합니다!!</h1>
              <hr />
              <div>이름: ${name}</div>
              <div>나이: ${age}</div>
              <div>학교: ${school}</div>
              <div>가입일: ${createdAt}</div>
          </body>
      </html>
    `;

  return mytemplate;
}

function sendTemplateToEmail(email, template) {
  console.log(`${email} 이메일로 가입환영 템플릿 "${template}"을 전송합니다.`);
}

function createUser({ name, age, school, email, createdAt }) {
  // 1. 이메일이 정상인지 확인(1-존재여부, 2="@" 포함여부
  const isValid = checkEmail(email);

  if (isValid === false) return;

  // 2. 가입환영 템플릿
  const template = getWelcomeTemplate({ name, age, school, createdAt });

  // 3. 이메일에 가입환영 템플릿전송하기
  sendTemplateToEmail(email, template);
}

const year = new Date().getFullYear();
const month = String(new Date().getMonth() + 1).padStart(2, "0");
const date = String(new Date().getDate()).padStart(2, "0");

const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "a@a.com";
const createdAt = `${year}-${month}-${date}`;
createUser({ name, age, school, email, createdAt });
