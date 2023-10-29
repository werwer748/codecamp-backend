import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column() // ({ type: 'varchar'})
  @Field(() => String)
  name: string; // default varchar(255)

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean; // default tinyint(1)

  @JoinColumn() // 1:1 관계 테이블 설정시에는 JoinColumn이 필요함
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable() // 중간테이블은 반드시 따로 만들어야하는 상황도 있지만 지금은 자동으로 생성 되게끔...
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) //ManyToMany는 반대편 테이블에서 이 테이블을 참조하는 이름도 명시해야함.
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  /*
    ? @ManyToMany를 일대다 대 다대일로 직접 풀어서 작성해야하는 경우는 언제?
    * 단순히 참조테이블 아이디만 저장하는게 아닌 추가적인 컬럼으로 데이터를 저장해야하는 경우
  */
}
