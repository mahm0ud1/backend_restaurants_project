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

  public async getRestaurants() {
    const data = await Restaurants.aggregate([
      {
        $lookup: {
          localField: "chefID",
          foreignField: "id",
          from: "chefs",
          as: "chef",
        }
      },
      {
        $project: {
          "_id": 0,
          "name": 1,
          "chef.name":1
        }
      },
    ]);
    if (data && data.length !== 0)
      return data;
  }

  public async getChefByID(params: Map<any, any>) {
    const id = params.get("id");
    if (id !== undefined) {
      const data = await Restaurants.aggregate([
        {
          $match: { id: parseInt(id) }
        },
        {
          $lookup: {
            localField: "chefID",
            foreignField: "id",
            from: "chefs",
            as: "chef",
          }
        },
        {
          $project: {
            "_id": 0,
            "id": 1,
            "name": 1,
            "age": 1,
            "about": 1,
            "chef_restaurants.name": 1,
          }
        },
        { $limit: 1 },
      ]);
      if (data && data.length !== 0)
        return data;
    }
    return "ERROR";
  }
}