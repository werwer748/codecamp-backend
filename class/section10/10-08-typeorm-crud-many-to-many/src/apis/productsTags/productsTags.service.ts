import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { In, Repository } from 'typeorm';
import {
  IProductsTagsServiceBulkInsert,
  IProductsTagsServiceFindByNames,
} from 'src/apis/productsTags/interfaces/products-tags-service.interface';

@Injectable()
export class ProductsTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}
  findByNames({ tagNames }: IProductsTagsServiceFindByNames) {
    return this.productsTagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: IProductsTagsServiceBulkInsert) {
    return this.productsTagsRepository.insert(names);
  }

  async findAndCreateTags({ names }) {
    const tagNames = names.map((el) => el.replace('#', '')); // ["전자제품", "영등포", "컴퓨터"]
    const prevTags = await this.findByNames({ tagNames });

    const temp = [];
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name);
      if (!isExists) temp.push({ name: el });
    });

    const newTags = await this.bulkInsert({ names: temp }); // bulk-insert는 save()로 불가능
    const tags = [...prevTags, ...newTags.identifiers];

    return tags;
  }
}
