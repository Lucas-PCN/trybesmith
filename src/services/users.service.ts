import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Credentials } from '../interfaces/user.interface';
import userModel from '../models/users.model';

dotenv.config();
const SECRET = 'randomsecret';

const userService = {
  async create(user: User): Promise<void> {
    await userModel.create(user);
  },
  createToken(username: string): string {
    const payload = { data: { username } };
    const token = jwt.sign(payload, SECRET);
    return token;
  },
  async findUser(username: string): Promise<Credentials> {
    const result = await userModel.findUser(username);

    return result;
  },
};

export default userService;