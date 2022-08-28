import { Request, Response, NextFunction } from 'express';
import userService from '../services/users.service';

const validateProduct = {
  productName: (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (typeof name !== 'string') {
      return res.status(422).json({ message: '"name" must be a string' });
    }
    if (name.length < 3) {
      return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
    }

    next();
  },
  productAmount: (req: Request, res: Response, next: NextFunction) => {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: '"amount" is required' });
    }
    if (typeof amount !== 'string') {
      return res.status(422).json({ message: '"amount" must be a string' });
    }
    if (amount.length < 3) {
      return res.status(422)
        .json({ message: '"amount" length must be at least 3 characters long' });
    }

    next();
  },
  validateToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
      const { data } = userService.readToken(token, res);

      const user = userService.findUser(data.username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    next();
  },
  bodyProduct: (req: Request, res: Response, next: NextFunction) => {
    const { productsIds } = req.body;

    if (!productsIds) {
      return res.status(400).json({ message: '"productsIds" is required' });
    }
    if (typeof productsIds !== 'object') {
      return res.status(422).json({ message: '"productsIds" must be an array' });
    }
    if (productsIds.length === 0) {
      return res.status(422).json({ message: '"productsIds" must include only numbers' });
    }

    next();
  },
};

export default validateProduct;