import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";

export class OrdersController {
  public static async getChefs(req: Request, res: Response) {
    try {
      const userID = req.params.userID;
      const service = new OrdersService();
      const orderRes = await service.getOrders(userID);
      return res.send(orderRes);
    } catch (error) {
      return res.send(error);
    }
  }
  
  public static async createOrder(req: Request, res: Response) {
    try {
      const order = req.body;
      const service = new OrdersService();
      const orderRes = await service.createOrder(order);
      return res.send(orderRes);
    } catch (error) {
      return res.send(error);
    }
  }
}