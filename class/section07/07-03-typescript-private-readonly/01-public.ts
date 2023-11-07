// public

// class Monster2 {

// power; => public, private, protected, readonly 중 하나라도 있으면 생략 가능
//   constructor(public power: any) {

// this.power = power; public, private, protected, readonly 중 하나라도 있으면 생략 가능
//   }

//   attack1 = () => {
//     console.log("아타크!");
//     console.log("내 공격력은 " + this.power + "라구!!!"); // 내부 사용 가능
//     this.power = 30; // 내부 변경 가능
//   };

//   run = () => {
//     console.log("도망!!!");
//   };
// }

// 상속받는 순간 부모의 모든 것을 물려받는다.
// class 공중몬스터2 extends Monster2 {
//   attack2 = () => {
//     console.log("아타크!");
//     console.log("내 공격력은 " + this.power + "라구!!!"); // 상속받아서 내부 사용 가능
//    this.power = 30; // 상속받아서 내부 변경 가능
//   };
// }

//   객체(인스턴스) / 설명서
// const myMonster22 = new 공중몬스터2(20);
// myMonster22.attack1();
// myMonster22.attack2();
// console.log(myMonster22.power); // 외부 사용 가능
// myMonster22.power = 10; // 외부 수정 가능
