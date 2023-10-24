// private readonly: 예상치 못한 곳에서의 수정을 방지하기 위해 사용(내부 접근만 가능하게끔..)

class Monster2 {
  // power; => public, private, protected, readonly 중 하나라도 있으면 생략 가능
  constructor(private readonly power: any) {
    // this.power = power; public, private, protected, readonly 중 하나라도 있으면 생략 가능
  }

  attack1 = () => {
    console.log("아타크!");
    console.log("내 공격력은 " + this.power + "라구!!!"); // 안에서 접근만 가능
    this.power = 30; // 안에서 수정 불가
  };

  run = () => {
    console.log("도망!!!");
  };
}

// 상속받는 순간 부모의 모든 것을 물려받는다.
class 공중몬스터2 extends Monster2 {
  attack2 = () => {
    console.log("아타크!");
    console.log("내 공격력은 " + this.power + "라구!!!"); // 자식이 접근 불가능
    this.power = 30; // 자식이 수정 불가능
  };
}

//   객체(인스턴스) / 설명서
const myMonster22 = new 공중몬스터2(20);
myMonster22.attack1();
myMonster22.attack2();
console.log(myMonster22.power); // 밖에서 접근 불가능
myMonster22.power = 10; // 밖에서 수정 불가능
