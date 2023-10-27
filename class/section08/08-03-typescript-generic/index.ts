// 1. 문자 / 숫자 / 불린 기본타입 - primitive 타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입(그냥 JS랑 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); // any는 아무거나 다된다. - 에러를 발생시켜주지 않는다.
  return [arg3, arg2, arg1];
};

const result = getAny("철수", 123, true);

//
//
// 3. unknown 타입 - any보다 쪼끔 좋은 애 => 모든 타입이 들어갈 수는 있지만, 아직은 어느 타입을 사용할지 모를때 사용한다.
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  // console.log(arg1 + 100); => if 밖에서는 타입을 모르기 때문에 에러가 발생한다.
  if (typeof arg1 === "number") {
    console.log(arg1 + 100);
  }
  return [arg3, arg2, arg1];
};

const result = getUnknown("철수", 123, true);

//
//
// 4. generic 타입 - unknown 보다 좋은 애임 => 타입을 만든다? any처럼 다들어가지만 return 타입이 잘 잡힌다.
// 안전하면서 활용 범위가 넓다.
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

// 함수 실행시 <string, number, boolean>를 지정하면 함수 파라미터 검사도 정확히 시행한다. => ("철수", 123, "true" 여기가 스트링되면) 에러 발생
const result = getGeneric<string, number, boolean>("철수", 123, true);
//
//
// 4. generic 타입 2 - 타입 명을 축약하여 사용할 수 있음 => T1, T2, T3
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

const result = getGeneric2("철수", 123, true);

//
//
// 4. generic 타입 3 - 타입 명을 조금 더 축약 할 수 있음 => T, U, V
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}

const result = getGeneric3("철수", 123, true);

//
//
// 4. generic 타입 4
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};

const result = getGeneric4("철수", 123, true);

//아폴로 모듈에서 forRoot() 함수를 사용할 때, 제네릭 타입을 사용하는 예제
function forRoot<T>(arg1: T): [T] {
  return [arg3, arg2, arg1];
}

const result = getGeneric4<string>({...});

/*
  * Generic은 라이브러리 제공자 입장에서 사용자가 어떤 타입을 사용할지 모르는 상태에서도, 타입을 정확하게 지정할 수 있게 해준다.
  * 함수를 만들어 제공할 때, 안전하고 확장성 높은 코드 사용을 위해 많이 사용함.
*/
