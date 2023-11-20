import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from 'src/apis/products/dto/create-product.input';
import { UpdateProductInput } from 'src/apis/products/dto/update-product.input';
import { Product } from 'src/apis/products/entities/product.entity';
import { ProductsService } from 'src/apis/products/products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    /* 
        ? << 브라우저에 결과를 보내주는 두가지 방법 >> 

        * 1. 등록된 내용이 담긴 객체를 그대로 브라우저에 돌려보내주기

        * 2. 결과메시지만 간단히 보내주기
        ex) return '정상적으로 상품이 등록되었습니다.'
    */

    // 서비스에 await안써도 nest가 알아서 브라우저로 나가기전에 처리해준다.
    return this.productsService.create({ createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string): Promise<boolean> {
    return this.productsService.delete({ productId });
  }
}
