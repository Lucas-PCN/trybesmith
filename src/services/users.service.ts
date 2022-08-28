import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response } from 'express';
import { User, Credentials, Id } from '../interfaces/user.interface';
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
  readToken(token: string, res: Response): JwtPayload {
    let user;
    try {
      user = jwt.verify(token, SECRET);
      return user as JwtPayload;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
  async getId(data: string): Promise<Id | undefined> {
    const result = await userModel.getId(data);

    return result;
  },
};

export default userService;