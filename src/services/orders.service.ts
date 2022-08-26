import Order from '../interfaces/order.interface';
import orderModel from '../models/orders.model';

const orderService = {
  async getAll(): Promise<Order[]> {
    const result = await orderModel.getAll();

    return result;
  },
};

export default orderService;