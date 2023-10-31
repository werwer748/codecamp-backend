import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  IProductServiceCheckSoldout,
  IProductServiceUpdate,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
} from 'src/apis/products/interfaces/products-service.interface';
import { ProductsSaleslocationsService } from 'src/apis/productsSaleslocations/productsSaleslocations.service';
import { ProductsTagsService } from 'src/apis/productsTags/productsTags.service';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, // 레포지토리 주입받을 때 사용법 - 타입ORM이 만들어서 제공해주는 것.
    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
    private readonly productsTagsService: ProductsTagsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    //   // 하나 하나 직접 나열하는 방식
    //   //   name: '마우스',
    //   //   description: '좋은 마우스임',
    //   //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 동록하는 방법
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;
    console.log('뭐가 잘못됨??', createProductInput);
    // 2-1) 상품 거래 위치 등록
    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    }); // 서비스를 타고가야하는 이유는...?
    //     레파지토리에 직접 접근하면 검증로직 통일이 어렵기 때문!!

    // 2-2) 상품태그 등록
    // productTags가 ["#전자제품", "#영등포", "#컴퓨터"] 와 같은 패턴이라고 가정
    const tagNames = productTags.map((el) => el.replace('#', '')); // ["전자제품", "영등포", "컴퓨터"]
    const prevTags = await this.productsTagsService.findByNames({ tagNames });

    const temp = [];
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name);
      if (!isExists) temp.push({ name: el });
    });

    const newTags = await this.productsTagsService.bulkInsert({ names: temp }); // bulk-insert는 save()로 불가능
    const tags = [...prevTags, ...newTags.identifiers];
    // const tags = await this.productsTagsService.findAndCreateTags({
    //   names: productTags,
    // });

    const result2 = this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
      productCategory: {
        id: productCategoryId,
        // 만약 name까지 같이 넣고 싶다면?
        // => crateProductInput에 name까지 포함해서 받아오기
      },
      productTags: tags, // id배열
    });
    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<Product> {
    // const product = await this.productsRepository.findOne({
    //   where: { id: productId },
    // });
    // 수정할 데이터의 기존 정보를 가져온다. (모든필드)
    const product = await this.findOne({ productId });

    /*
    if (product.isSoldout) {
       버그: 실행은 되는데 개발자 의도와 다르게 동작,
       에러: 실행안됨,
       예외: 예상치 못한 작동
       throw new HttpException(
         '이미 판매 완료된 상품입니다!',
         HttpStatus.UNPROCESSABLE_ENTITY, // 422
       ); => 축약하면 아래와 같다.
       */
    //   throw new UnprocessableEntityException('이미 판매 완료된 상품입니다!');
    // }

    const { productTags, ...restInput } = updateProductInput;
    console.log('updateProductInput', updateProductInput);

    const tagNames = productTags.map((el) => el.replace('#', '')); // ["전자제품", "영등포", "컴퓨터"]
    const prevTags = await this.productsTagsService.findByNames({ tagNames });

    const temp = [];
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name);
      if (!isExists) temp.push({ name: el });
    });

    const newTags = await this.productsTagsService.bulkInsert({ names: temp }); // bulk-insert는 save()로 불가능
    const tags = [...prevTags, ...newTags.identifiers];

    // 검증은 서비스에서 진행하자.
    this.checkSoldout({ product });
    // try { // => exception filter로 빼기
    const result = this.productsRepository.save({
      // 등록도 save로 하고 수정도 save로 한다.
      ...product, // 기존 정보를 => 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때
      // productSaleslocation,
      // productCategory: {
      //   id: productCategoryId,
      // },
      ...restInput, // 수정할 값으로 덮어씌운다.
      productTags: tags,
    });

    // } catch (error) {
    //   console.log(error);
    // }

    /*
    this.productsRepository.create;
    this.productsRepository.insert;
    this.productsRepository.update;

     ? save: 
      * db에 등록 후 결과를 반환한다. 변수에 저장 가능
      * save에 id가 있으면 수정, 없으면 등록으로 동작한다.
      
     ? insert, update: 
      * 등록, 수정하지만 결과를 객체로 돌려받지는 않는다.
    
     ? create:
      * DB 접속이랑 관련 없음. 등록을 위한 빈 껍데기 객체를 만든다.
     */

    return result;
  }

  // 1. checkSoldout 함수로 만드는 이유 => 수정시, 삭제시 같은 검증 로직 사용
  checkSoldout({ product }: IProductServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다!');
    }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접구현) - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId });
    // 단점: id로만(다른컬럼 x) 삭제가 가능
    // 장점: 여러 id를 한번에 삭제할 수 있다.

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId });
    // 단점: 한번에 하나씩만 삭제가 가능
    // 장점: 다른 컬럼으로도 삭제 가능
    return result.affected ? true : false;
  }
}
