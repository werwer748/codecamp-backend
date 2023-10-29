import { CreateProductInput } from 'src/apis/products/dto/create-product.input';
import { UpdateProductInput } from 'src/apis/products/dto/update-product.input';
import { Product } from 'src/apis/products/entities/product.entity';

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

export interface IProductServiceCheckSoldout {
  product: Product;
}
