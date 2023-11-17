import { Product } from 'src/apis/products/entities/product.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';

/*
? trigger
* 중요하지 않은 비즈니스 로직을 트리거로 빼서 처리하는 것이 좋다.
* 사용할 때 하지않을때를 구분해서 사용하자.
*/

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    // console.log('afterInsert', event);

    const id = event.entity.id;
    const name = event.entity.name;
    const description = event.entity.description;
    const price = event.entity.price;
    const isSoldout = event.entity.isSoldout;

    console.log(`${id} ${name} ${description} ${price} ${isSoldout}`); // 빅쿼리, 엘라스틱서치 등에 담아서 검색에 용이하도록..
    /*
        1. 트리거는 언제 사용하면 안될까?
        트랜잭션으로 연결된 중요한 내용들...

        2. 어떤 것들을 사용하면 좋을까?
        메인 로직에 큰 피해를 안끼치는 로직들 (통계 계산하기, 로그 쌓아놓기...)
    */
  }
}
