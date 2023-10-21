//* 비구조화 할당, 구조분해 할당
const profile = {
  name: "철수",
  age: 12,
  school: "다람쥐초등학교",
};

const { name, school } = profile; // 객체의 구조분해할당은 순서는 중요하지 않음
console.log(name);
console.log(school);

// 1. 일반변수 전달하기
// function zzz(fruit) {
//   console.log(fruit);
// }

// zzz("사과");

// 2. 객체 전달하기
// function zzz(aaa) {
//   console.log(aaa);
//   console.log(aaa.apple);
//   console.log(aaa.banana);
// }

// const basket = { apple: 3, banana: 10 };

// zzz(basket);

// 3. 객체 구조분해할당 방식으로 전달하기
function zzz({ apple, banana }) {
  console.log(apple);
  console.log(banana);
}

const basket = { apple: 3, banana: 10 };

zzz(basket);
