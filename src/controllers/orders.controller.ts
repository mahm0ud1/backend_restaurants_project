import { Request, Response } from "express";
import Token from "../interface/tokenInterface";
import { CustomRequest, getUserID } from "../middleware/jwtAuth";
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
  
  public static async createOrder(req: Request, res: Response, userID: any) {
    try {
      const order = req.body;
      const userID = getUserID(req);
      const service = new OrdersService();
      const orderRes = await service.createOrder(userID, order);
      return res.send(orderRes);
    } catch (error) {
      return res.send(error);
    }
  }
}