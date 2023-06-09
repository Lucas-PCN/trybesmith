import { Request, Response } from 'express';
import orderService from '../services/orders.service';
import productService from '../services/products.service';
import userService from '../services/users.service';
import { Id } from '../interfaces/user.interface';

const orderController = {
  async getAll(_req: Request, res: Response) {
    const result = await orderService.getAll();
    
    return res.status(200).json(result);
  },
  async create(req: Request, res: Response) {
    const { productsIds } = req.body;
    const token = req.headers.authorization;

    if (token) {
      const { data } = userService.readToken(token, res);
      const { id } = await userService.getId(data.username) as Id;
      const orderId = await orderService.add(id as number);

      const productsUpdated = productsIds.map((productId: number) => productService
        .updateOrder(orderId, productId));

      await Promise.all(productsUpdated);

      return res.status(201).json({ userId: id, productsIds });
    }
  },
};

export default orderController;