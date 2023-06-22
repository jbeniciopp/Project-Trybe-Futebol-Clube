import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { ILogin, IUser, IUserResponse, IUserRole } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { NewEntity } from '../Interfaces';
import { IToken } from '../Interfaces/IToken';

const UserNotFound = 'Invalid email or password';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async findByEmail(email: string): Promise<ServiceResponse<IUserRole>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'NOT_FOUND', data: { message: UserNotFound } };

    return { status: 'SUCCESSFUL', data: user };
  }

  public async findAll(): Promise<ServiceResponse<IUserResponse[]>> {
    const allUsers = await this.userModel.findAll();
    const usersReturn = allUsers
      .map(({ id, email, username, role }) => ({ id, email, username, role }));
    return { status: 'SUCCESSFUL', data: usersReturn };
  }

  public async findById(id: number): Promise<ServiceResponse<IUserResponse>> {
    const user = await this.userModel.findById(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: UserNotFound } };
    const { email, username, role } = user as IUser;

    return { status: 'SUCCESSFUL', data: { id, email, username, role } };
  }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'UNAUTHORIZED', data: { message: UserNotFound } };
  }

  public async createUser(user: NewEntity<IUser>):
  Promise<ServiceResponse<IUserResponse | ServiceMessage>> {
    const userFound = await this.userModel.findByEmail(user.email);
    if (userFound) return { status: 'CONFLICT', data: { message: 'User already exists' } };

    const userPassword = bcrypt.hashSync(user.password, 10);
    const newUser = await this.userModel.create({ ...user, password: userPassword });
    const { id, email, username, role } = newUser as IUser;

    return { status: 'SUCCESSFUL', data: { id, email, username, role } };
  }
}
