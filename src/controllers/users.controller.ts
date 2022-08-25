import { Request, Response } from 'express';
import userService from '../services/users.service';

const userController = {
  async create(req: Request, res: Response) {
    const user = req.body;
    await userService.create(user);

    const token = userService.createToken(user.username);
    return res.status(201).json({ token }); 
  },
};

export default userController;