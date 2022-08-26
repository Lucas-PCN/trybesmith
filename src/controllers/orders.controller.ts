import { Request, Response } from 'express';
import orderService from '../services/orders.service';

const orderController = {
  async getAll(_req: Request, res: Response) {
    const result = await orderService.getAll();
    
    return res.status(200).json(result);
  },
};

export default orderController;