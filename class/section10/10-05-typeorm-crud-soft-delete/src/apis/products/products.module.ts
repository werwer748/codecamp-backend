import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/apis/products/entities/product.entity';
import { ProductsResolver } from 'src/apis/products/products.resolver';
import { ProductsService } from 'src/apis/products/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
  ],
})
export class ProductsModule {}
