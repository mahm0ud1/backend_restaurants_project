import { OrdersDal } from "../dal/orders.dal";

export class OrdersService {
    public async getOrders(userID:any) {
        const dal = new OrdersDal();
        const res = await dal.getUserOrders(userID);
        return res;
    }

    public async createOrder(order:any) {
        const dal = new OrdersDal();
        const res = await dal.createOrder(order);
        return res;
    }
}