console.log("Hello, World!");

function getToken() {
  //? padStart() 로 6자리가 안되면 앞을 0으로 채워준다.
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
}

getToken();
