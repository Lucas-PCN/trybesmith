import { Request, Response, NextFunction } from 'express';
import userService from '../services/users.service';

const validateUser = {
  username: (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
  
    if (!username) {
      return res.status(400).json({ message: '"username" is required' });
    }
    if (typeof username !== 'string') {
      return res.status(422).json({ message: '"username" must be a string' });
    }
    if (username.length < 3) {
      return res.status(422).json({
        message: '"username" length must be at least 3 characters long' });
    }
  
    next();
  },
  classe: (req: Request, res: Response, next: NextFunction) => {
    const { classe } = req.body;
  
    if (!classe) {
      return res.status(400).json({ message: '"classe" is required' });
    }
    if (typeof classe !== 'string') {
      return res.status(422).json({ message: '"classe" must be a string' });
    }
    if (classe.length < 3) {
      return res.status(422)
        .json({ message: '"classe" length must be at least 3 characters long' });
    }
  
    next();
  },
  level: (req: Request, res: Response, next: NextFunction) => {
    const { level } = req.body;
  
    if (level <= 0) {
      return res.status(422).json({ message: '"level" must be greater than or equal to 1' });
    }
    if (!level) {
      return res.status(400).json({ message: '"level" is required' });
    }
    if (typeof level !== 'number') {
      return res.status(422).json({ message: '"level" must be a number' });
    }
  
    next();
  },
  password: (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }
    if (typeof password !== 'string') {
      return res.status(422).json({ message: '"password" must be a string' });
    }
    if (password.length < 8) {
      return res.status(422)
        .json({ message: '"password" length must be at least 8 characters long' });
    }
  
    next();
  },
  checkUserAndPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const findUser = await userService.findUser(username);

    if (!findUser || findUser.password !== password) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    next();
  },
};
  
export default validateUser;