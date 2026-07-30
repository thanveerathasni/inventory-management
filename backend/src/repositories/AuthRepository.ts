import { IUser, User } from '../models/User.model';
import { BaseRepository } from './BaseRepository';

export class AuthRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async existsByEmail(email: string): Promise<boolean> {
    return (await this.findByEmail(email)) !== null;
  }
  async updateRefreshToken(
  userId: string,
  refreshToken: string
) {
  return this.updateById(userId, {
    refreshToken,
  });
}

async clearRefreshToken(userId: string) {
  return this.updateById(userId, {
    refreshToken: null,
  });
}
}