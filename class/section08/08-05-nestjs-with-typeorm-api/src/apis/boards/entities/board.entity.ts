import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // entity는 db의 테이블과 매핑되는 클래스
export class Board {
  @PrimaryGeneratedColumn('increment')
  number: number;

  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  contents: string;
}
