import { Request, Response } from 'express';
import productService from '../services/products.service';

const productController = {
  async create(req: Request, res: Response) {
    const product = req.body;
    const result = await productService.create(product);

    return res.status(201).json(result);
  },
};

export default productController;