import express from 'express';
import productController from './controllers/products.controller';
import userController from './controllers/users.controller';
import validateProduct from './middlewares/product.middleware';
import validateUser from './middlewares/user.middleware';

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

app.post(
  '/users',
  validateUser.username,
  validateUser.classe,
  validateUser.level,
  validateUser.password,
  userController.create,
);

export default app;
