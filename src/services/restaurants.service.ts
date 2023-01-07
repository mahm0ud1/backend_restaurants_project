import { RestaurantsDal } from "../dal/restaurants.dal";

export class RestaurantsService {
  public async getRestaurant(id: Number) {
    const dal = new RestaurantsDal();
    const res = await dal.getRestaurant(id);
    return res;
  }

  public async getPopularRestaurants() {
    const dal = new RestaurantsDal();
    const res = await dal.getPopularRestaurants();
    return res;
  }

  public async getRestaurants() {
    const dal = new RestaurantsDal();
    const res = await dal.getRestaurants();
    return res;
  }

  public async createRestaurant(restaurant: any) {
    const dal = new RestaurantsDal();
    const res = dal.createRestaurant(restaurant);
    return res;
  }
}
