// Utility Types: 기존의 타입을 조작해 새로운 타입을 만드는 것

interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial(있어도되고 없어도 되는) 타입: 특정 타입 전체를 옵셔널하게 만들어줌
type aaa = Partial<IProfile>;
/*
type aaa = {
  name?: string;
  age?: number;
  school?: string;
  hobby?: string;
}
*/

// 2. Required(필수적인) 타입: 특정 타입 전체를 필수로 만들어줌
type bbb = Required<IProfile>;
/*
type bbb = {
  name: string;
  age: number;
  school: string;
  hobby: string;
}
*/

// 3. Pick(특정 타입에서 몇개의 속성을 선택) 타입: 특정 타입에서 몇개의 속성을 선택하여 타입을 만들어줌
type ccc = Pick<IProfile, "name" | "age">;
/*
type ccc = {
    name: string;
    age: number;
}
*/

// 4. Omit(특정 타입에서 지정된 속성만 제거) 타입: 특정 타입에서 지정된 속성만 제거하여 타입을 만들어줌
type ddd = Omit<IProfile, "school">;
/*
type ddd = {
    name: string;
    age: number;
    hobby?: string | undefined;
}
*/

// 5. Record 타입: 특정 타입의 모든 속성을 다른 타입으로 변환
type eee = "철수" | "영희" | "훈이"; // Union 타입 => type eee = "철수" | "영희" | "훈이": 셋중 하나만 사용 가능
let child1: eee = "영희"; // "철수" | "영희" | "훈이": 셋중 하나만 사용 가능
let child2: string = "사과"; // string이면 다 된다.

type fff = Record<eee, IProfile>; // Record<key, value>
/*
type fff = {
    철수: IProfile;
    영희: IProfile;
    훈이: IProfile;
}
*/

// 6. 객체의 key들로 Union 타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
// keyof IProfile => 키만 뽑아서 나열
let myprofile: ggg = "hobby";

// 7. type 과 interface 차이 => interface는 선언 병합 가능(합쳐진다)
interface IProfile {
  candy: number; // 기존 IProfile에 candy 추가 => 선언 병합으로 인하여
}

// 응용
let profile: Partial<IProfile> = {
  candy: 10,
  // name: "철수",
  // age: 10,
  // school: "다람쥐초등학교",
};
