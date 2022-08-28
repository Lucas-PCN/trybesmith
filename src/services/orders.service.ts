import Order from '../interfaces/order.interface';
import orderModel from '../models/orders.model';

const orderService = {
  async getAll(): Promise<Order[]> {
    const result = await orderModel.getAll();

    return result;
  },
  async create(userId: number): Promise<number> {
    const orderId = await orderModel.create(userId);

    return orderId;
  },
  async add(userId: number) {
    const result = orderModel.add(userId);
    return result;
  },
};

export default orderService;