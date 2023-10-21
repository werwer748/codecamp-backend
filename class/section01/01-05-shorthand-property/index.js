function qqq(aaa) {
  console.log(aaa); // 객체
  console.log(aaa.name); // 철수
  console.log(aaa.age); // 12
  console.log(aaa.school); // 다람쥐초등학교
}

const name = "철수";
const age = 12;
const school = "다람쥐초등학교";
/*
const profile = {
  name: name,
  age: age,
  school: school, 
};
*/
const profile = { name, age, school }; // => name, age, school이 키 밸류가 같으므로 축약 가능: 이걸 shorthand property라고 함

qqq(profile); // 변수에 담아 보내기
qqq({ name, age, school }); // 바로 보내기
// 결과는 동일
