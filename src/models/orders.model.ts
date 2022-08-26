import Order from '../interfaces/order.interface';
import connection from './connection';

const orderModel = {
  async getAll(): Promise<Order[]> {
    const query = `SELECT
    O.id, O.userId, JSON_ARRAYAGG(P.id) as productsIds
  FROM Trybesmith.Products as P
  INNER JOIN Trybesmith.Orders as O
  ON P.orderId = O.id
  GROUP BY O.id
  ORDER BY O.userId`;
    const [result] = await connection.execute(query);
    return result as Order[];
  },
};

export default orderModel;