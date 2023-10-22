import axios from "axios";

// 1. 비동기 방식
function fetchAsync() {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log("비동기 방식: ", result); // 요청만 보내놓고 값이 들어오지 않았는데 result에 담을려고 하니까 Promise { <pending> } 이렇게 나옴
}

fetchAsync();

// 2. 동기 방식
// async function fetchSync() { // async await은 짝꿍!
//   const result = await axios.get("https://koreanjson.com/posts/1");
//   console.log("동기 방식: ", result); // 기다렸다가 값이 들어온 후에 result에 담음 => 제대로된 결과
//   console.log("동기 방식: ", result.data.title);
// } //TODO 함수 중복 선언 문제를 피하기 위해 화살표 함수로 변경

const fetchSync = async () => {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log("동기 방식: ", result); // 기다렸다가 값이 들어온 후에 result에 담음 => 제대로된 결과
  console.log("동기 방식: ", result.data.title);
};

fetchSync();
