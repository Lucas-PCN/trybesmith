import { ResultSetHeader } from 'mysql2/promise';
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
  async create(userId: number): Promise<number> {
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
    const [result] = await connection.execute<ResultSetHeader>(query, [userId]);

    const { insertId: orderId } = result;
    return orderId;
  },
  async add(userId: number) {
    const result = await connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );

    const [dataInserted] = result;
    const { insertId: orderId } = dataInserted;
    return orderId;
  },
};

export default orderModel;