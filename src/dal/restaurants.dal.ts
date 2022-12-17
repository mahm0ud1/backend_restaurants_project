import Chefs from "../db/models/chefs";
import Restaurants from "../db/models/restaurants";

export class RestaurantsDal {
  public async createRestaurant(restaurant: any) {
    restaurant = new Restaurants({
      name: restaurant.restaurantName,
      chef: restaurant.chefName,
    });

    const response = await Restaurants.create(restaurant);
    const result = await Chefs.findOne({ name: response.chef }).updateOne({
      $push: { restaurants: response._id },
    });
    return response;
  }

  public findAll() {
    return Restaurants.find();
  }
}
