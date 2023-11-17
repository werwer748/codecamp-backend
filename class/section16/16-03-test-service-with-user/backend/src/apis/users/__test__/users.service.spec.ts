import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';

// DB 모킹하기
class MockUsersRepository {
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'qqq@qqq.com', password: '1234', name: '철수', age: 12 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);

    if (users.length) {
      return users[0];
    }
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });

    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      //   imports: [TypeOrmModule], // 테스트는 실 DB에 접근하지 않게 해야 한다.
      //   controllers: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  //   describe('findOneByEmail', () => {
  //     const result = usersService.findOneByEmail({ email: 'a@a.com' });

  //     expect(result).toStrictEqual({ // toStrictEqual: 객체 비교
  //       email: 'a@a.com',
  //       name: '짱구',
  //     });
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기', async () => {
      const myData = {
        email: 'a@a.com',
        password: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('회원등록 잘 됐는지 검증하기', async () => {
      const myData = {
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      const { password, ...rest } = result;
      expect(rest).toStrictEqual({
        // 받아온 데이터와 집어넣은 데이터가 일치하는지 확인
        email: 'bbb@bbb.com',
        name: '철수',
        age: 13,
      });
    });
  });

  // TDD => 테스트를 먼저 만들자!
  it('이메일 길이가 초과됐을때 검증!!', async () => {
    const myData = {
      email:
        'askdjfhshfjksadhfkjasdhfkjasdhfklasjdfhasjdhfkjasdhfjksadhfkjasdhfkjahsdf@bbb.com',
      password: '1234',
      name: '철수',
      age: 13,
    };

    try {
      await usersService.create({ ...myData });
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });
});
