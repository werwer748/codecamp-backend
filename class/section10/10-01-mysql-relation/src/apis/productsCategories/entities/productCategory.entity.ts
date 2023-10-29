import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // unique: 중복된 값을 허용하지 않음 - 각 row의 name 컬림 중복 x
  name: string; // default varchar(255)
}
