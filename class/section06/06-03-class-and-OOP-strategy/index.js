// 클래스 전략!

//부품용 클래스
class 공중부품 {
  run = () => {
    console.log("날라서 도망가자");
  };
}

class 지상부품 {
  run = () => {
    console.log("뛰어서 도망가자");
  };
}

class Monster {
  power = 10;
  부품; // 초기값 안주기

  // constructor: 생성자 - 생성시 실행되는 함수
  constructor(qqq) {
    this.부품 = qqq; // 결국 클래스안에 클래스를 넣은거네? => 고급진 패턴이라고한다. 익숙해져야한데용~~
  }

  attack = () => {
    console.log("아타크!");
    console.log("내 공격력은 " + this.power + "라구!!!");
  };

  run = () => {
    this.부품.run();
  };
}

// const 부품 = new 공중부품(); 해서 부품을 넣어줘도 된다.
const myMonster1 = new Monster(new 공중부품());
myMonster1.attack();
myMonster1.run();

const myMonster2 = new Monster(new 지상부품());
myMonster2.attack();
myMonster2.run();
