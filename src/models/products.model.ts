import { ResultSetHeader } from 'mysql2';
import Product from '../interfaces/product.interface';
import connection from './connection';

const productModel = {
  async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);';

    const [{ insertId }] = await connection
      .execute<ResultSetHeader>(query, [name, amount]);

    return { id: insertId, ...product };
  },
  async getAll(): Promise<Product[]> {
    const query = 'SELECT * FROM Trybesmith.Products;';
    const [result] = await connection.execute(query);
    return result as Product[];
  },
  async updateOrder(orderId: number, productId: number): Promise<void> {
    const query = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?;';
    await connection.execute(query, [orderId, productId]);
  },
};

export default productModel;