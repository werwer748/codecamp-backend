// 클래스 상속

class Monster {
  power = 10;

  // constructor: 생성자 - 생성시 실행되는 함수
  constructor(qqq) {
    this.power = qqq;
  }

  attack = () => {
    console.log("아타크!");
    console.log("내 공격력은 " + this.power + "라구!!!");
  };

  run = () => {
    console.log("도망!!!");
  };
}

// 상속받는 순간 부모의 모든 것을 물려받는다.
class 공중몬스터 extends Monster {
  constructor(aaa) {
    super(aaa + 1); // super: 부모의 생성자를 호출 => 자식의 생성자에서 받은 값을 부모로 넘긴다.
  }
  run = () => {
    // run을 재정의하게 되면 부모의 run은 무시된다. => 오버라이딩: 부모의 run을 덮어쓰기
    console.log("날아서 도망가장~~");
  };
}

class 지상몬스터 extends Monster {
  constructor(bbb) {
    super(bbb); // super: 부모의 생성자를 호출 => 자식의 생성자에서 받은 값을 부모로 넘긴다.
  }
  run = () => {
    // 오버라이딩: 부모의 run을 덮어쓰기
    console.log("뛰어서 도망가장~~");
  };
}

//   객체(인스턴스) / 설명서
const myMonster1 = new 공중몬스터(20);
myMonster1.attack();
myMonster1.run();

const myMonster2 = new 지상몬스터(50);
myMonster2.attack();
myMonster2.run();
