import { Identifiable } from '..';

// usuário existente para login
export interface ILogin {
  email: string;
  password: string;
}

// usuário completo
export interface IUser extends Identifiable, ILogin {
  username: string;
  role: string;
}

// usuário a ser retornado pela API
export type IUserResponse = Omit<IUser, 'password'>;

// somente o role
export type IUserRole = {
  role: string
};
