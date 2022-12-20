import { Increment } from "mongoose-auto-increment-ts";
import Chefs from "../db/models/chefs";
import Restaurants from "../db/models/restaurants";

export class RestaurantsDal {
  private static async getIncrementRestaurantID() {
    let chefID = null;
    await Increment('restaurants').then(
      id => chefID = id
    );
    return chefID;
  }

  public async createRestaurant(restaurant: any) {
    try {
      if (restaurant.chef_id !== undefined) {
        const data = await Chefs.findOne({ id: restaurant.chef_id });
        if (data) {
          const id = await RestaurantsDal.getIncrementRestaurantID();
          restaurant = new Restaurants({
            id: id,
            name: restaurant.restaurantName,
            chefID: restaurant.chef_id,
          });

          const response = await Restaurants.create(restaurant);
          if (response)
            return "Created";
        }
      }
    }
    catch (err) { }
    return "ERROR";
  }

  public getRestaurants() {
    return Restaurants.find()
      .select({
        "_id": 0,
        "id": 1,
        "name": 1,
        "chefID": 1
      });
  }
}