import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from 'src/apis/products/interfaces/products-service.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, // 레포지토리 주입받을 때 사용법 - 타입ORM이 만들어서 제공해주는 것.
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,
      // 하나 하나 직접 나열하는 방식
      //   name: '마우스',
      //   description: '좋은 마우스임',
      //   price: 3000,
    });

    /* result 확인!
    result = {
        id: uuid 로 만들어진 아이디 값,
        name: 마우스,
        description: 좋은 마우스임,
        price: 3000,
    }
    */
    return result;
  }
}
