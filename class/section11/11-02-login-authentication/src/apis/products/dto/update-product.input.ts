import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProductInput } from 'src/apis/products/dto/create-product.input';

@InputType() // 이거는 어쩔수없이 써야한다.
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // 아래 내용들을 상속받음
  // name?: string;
  // description?: string;
  // price?: number;
}

//? PickType(CreateProductInput, ['name', 'price']); => name, price만 뽑기
//? OmitType(CreateProductInput, ['description']); => description만 빼기
//? PartialType(CreateProductInput); => 모든 필드를 optional로 만들기
