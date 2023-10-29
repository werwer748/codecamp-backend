import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/apis/products/entities/product.entity';
import { ProductsResolver } from 'src/apis/products/products.resolver';
import { ProductsService } from 'src/apis/products/products.service';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { ProductsSaleslocationsService } from 'src/apis/productsSaleslocations/productsSaleslocations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    ProductsSaleslocationsService,
  ],
})
export class ProductsModule {}
