import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export class UserRepository extends Repository<User> {
  async findAllUser(): Promise<User[]> {
    return this.find();
  }
}
