import { Request, Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/commons/interfaces/context';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}

export interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
    age: number;
  };
}
export interface IAuthServiceLoginOAuth {
  req: Request & IOAuthUser;
  res: Response;
}
