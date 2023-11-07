const fetchData = async () => {
  // api 보내기 요청!

  // axios라고 가정한다.
  const result = await new Promise((성공시함수, 실패시함수) => {
    setTimeout(() => {
      try {
        console.log("이미지 받아왔습니다."); // 5초 뒤에 이미지 받아옴
        성공시함수("이미지.jpg");
      } catch (error) {
        실패시함수();
      }
    }, 5000);
  });

  console.log(result);

  console.log("받아온 jpg를 브라우저에 전달!");
};

fetchData();
