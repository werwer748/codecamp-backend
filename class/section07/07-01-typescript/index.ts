// 타입추론: aaa를 안녕하세요로 선언하고 타입은 따로 지정하지 않았는데도 알아서 string 타입으로 지정된다.
let aaa = "안녕하세요";
aaa = 3;

// 타입명시
let bbb: string = "안녕하세요";
bbb = 10;

// 타입명시가 필요한 상황
let ccc: number | string = 1000;
ccc = "1000원";

// 숫자타입
let ddd: number = 10;
ddd = "철수";

// 불린타입
let eee: boolean = true;
eee = false;
eee = "false"; // true로 작동함

// 배열타입
let fff: number[] = [1, 2, 3, 4, 5, "ㅎㅇ"];
let ggg: string[] = ["철수", "영희", "훈이", 10];
let hhh: (string | number)[] = ["철수", "영희", "훈이", 10];

// 객체타입
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string; // ?를 붙이면 선택적 프로퍼티(있어도되고~ 없어도되고~)가 된다.
}

const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "떡잎초등학교",
};
profile.name = "훈이"; // 타입 추론으로는 이것만 가능
profile.age = "8살";
profile.hobby = "수영";

// 함수타입 => 어디서 몇번이든 호출 가능하므로, 타입추론 할 수 없음(반드시, 타입명시 필요)
function add(num1: number, num2: number, unit: string): string {
  return num1 + num2 + unit;
}

const result = add(1000, 2000, "원"); // 결과의 리턴타입도 예측 가능!

const add2 = (num1: number, num2: number, unit: string): string => {
  return num1 + num2 + unit;
};

const result2 = add(1000, 2000, "원"); // 결과의 리턴타입도 예측 가능!

// any타입
let qqq: any = "철수"; // 자바스크립트와 동일
qqq = 123;
qqq = true;
