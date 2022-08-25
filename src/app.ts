import express from 'express';
import productController from './controllers/products.controller';
import validateProduct from './middlewares/product.middleware';

const app = express();

app.use(express.json());

app.post(
  '/products',
  validateProduct.productName,
  validateProduct.productAmount,
  productController.create,
);

app.get(
  '/products',
  productController.getAll,
);

export default app;
