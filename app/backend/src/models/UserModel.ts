import { NewEntity } from '../Interfaces';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, email, password, username, role }) => (
      { id, email, password, username, role }
    ));
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    const { email, password, username, role } = user;
    return { id, email, password, username, role };
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;
    return { id, email, password, username, role };
  }

  async create(data: NewEntity<IUser>): Promise<IUser> {
    const user = await this.model.create(data);
    const { id, email, password, username, role } = user;
    return { id, email, password, username, role };
  }
}
