import { Request, Response } from "express";
import { RestaurantsService } from "../services/restaurants.service";

export class RestaurantsController {
  public static async getPopularRestaurants(req: Request, res: Response) {
    try {
      const service = new RestaurantsService();
      const restaurants = await service.getPopularRestaurants();
      return res.send(restaurants);
    }
    catch (error) {
      console.log(error);
    }
    return "ERROR";
  }

  public static async getRestaurant(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const service = new RestaurantsService();
      const restaurant = await service.getRestaurant(id);
      return res.send(restaurant);
    }
    catch (error) {
      console.log(error);
    }
    return "ERROR";
  }

  public static async getRestaurants(req: Request, res: Response) {
    const service = new RestaurantsService();
    const restaurants = await service.getRestaurants();
    return res.send(restaurants);
  }

  public static async createRestaurant(req: Request, res: Response) {
    const params = req.body;
    const service = new RestaurantsService();
    const restaurant = await service.createRestaurant(params);
    return res.send(restaurant);
  }
}
