import { CreateProductInput } from 'src/apis/products/dto/create-product.input';

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}
