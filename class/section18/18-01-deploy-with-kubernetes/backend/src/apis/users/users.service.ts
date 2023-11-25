import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import {
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
} from 'src/apis/users/interfaces/users-service.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
//@types/bcrypt 설치시 타입스크립트니까 devDependencies에 설치하는게 좋음

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.findOneByEmail({ email });
    // throw new HttpException('이미 존재하는 유저입니다.', 409);
    // throw new HttpException('이미 존재하는 유저입니다.', HttpStatus.CONFLICT);
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');
    /*
     * 암호는 단방향 암호화를 해야 함(hash - 뭉갠다~)
     * 이 경우 특정 문자를 암호화해서 같은 값이 나올 수 있는 모든 경우의 수를 넣어가며 해킹하는 것이 가능함
     * 이 공격이 brute force attack - 무차별 대입 공격
     * 그리고 이 공격을위한 값들을 모두 모아놓은 것이 rainbow table
     * 그렇기 때문에 해시를 반복적으로 수행해서 값을 꼬아주는 것이 필요함 => salt
     * 이렇게 만든 해시화한 비밀번호를 DB에 저장.
     *
     * $2b$10$lg5oiAYnOGALSG2Az/xwWeNNA0Rpp5.mN2dUI72YKpf2v4BsRdo2i
     * $
     * 2b => 알고리즘 버전
     * $
     * 10 => 해시 반복 횟수
     * $
     * lg5oiAYnOGALSG2Az => 22자의 랜덤 salt값
     * /xwWeNNA0Rpp5.mN2dUI72YKpf2v4BsRdo2i => HASH 값
     *
     * 요약: 2**10번 해시화한 값이 위의 값임
     */

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }
}
