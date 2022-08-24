import Product from '../interfaces/product.interface';
import productModel from '../models/products.model';

const productService = {
  async create(product: Product): Promise<Product> {
    const result = await productModel.create(product);

    return result;
  },
};

export default productService;