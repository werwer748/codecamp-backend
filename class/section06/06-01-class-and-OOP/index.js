// class Date {
//   qqq = 3;
//   getFullYear() {}
//   getMonth() {}
// }

const date = new Date();
console.log(date.getFullYear());
console.log(date.getMonth() + 1);

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

//   객체(인스턴스) / 설명서
const myMonster1 = new Monster(20);
myMonster1.attack();
myMonster1.run();

const myMonster2 = new Monster(50);
myMonster2.attack();
myMonster2.run();
