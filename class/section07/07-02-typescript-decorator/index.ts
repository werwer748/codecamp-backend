// @ 데코레이터..
function Controller(aaaaaaaa: any) {
  console.log("===================="); // ====================
  console.log(aaaaaaaa); //[class CatsController]
  console.log("===================="); // ====================
}

@Controller // => @Controller(CatsController)
class CatsController {}
