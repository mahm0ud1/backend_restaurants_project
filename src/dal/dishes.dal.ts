import { Increment } from "mongoose-auto-increment-ts";
import Restaurants from "../db/models/restaurants";
import Dishes from "../db/models/dishes";

export class DishesDal {
  private static async getIncrementDishID() {
    let chefID = null;
    await Increment('Dishes').then(
      id => chefID = id
    );
    return chefID;
  }

  public async createDish(dish: any) {
    try {
      if (dish.restaurantID !== undefined) {
        const resturantID = dish.restaurantID;
        const data = await Restaurants.findOne({ id: resturantID});
        if (data) {
          const id = await DishesDal.getIncrementDishID();
          dish = new Dishes({
            id: id,
            name: dish.name,
            restaurantID: dish.restaurantID,
            imageURL: dish.imageURL,
            price: dish.price,
            about: dish.about,
            dishType: dish.dishType,
            signature: dish.signature,
          });

          const response = await Dishes.create(dish);
          if (response)
            return "Created";
        }
        else
        {
          return `Restaurant ID ${resturantID} not Found`;
        }
      }
    }
    catch (err) {
      console.log(err);
    }
    return "ERROR";
  }

  public async getDishes() {
    const data = await Dishes.aggregate([
      {
        $lookup: {
          localField: "restaurantID",
          foreignField: "id",
          from: "restaurants",
          as: "restaurant",
        }
      },
      {
        $project: {
          "_id": 0,
          "id":1,
          "name": 1,
          "imageURL": 1,
          "price": 1,
          "about":1,
          "dishType": 1,
          "signature":1,
          "restaurant.id":1,
          "restaurant.name":1,
          "restaurant.about":1,
        }
      },
    ]);
    if (data && data.length !== 0)
      return data;

    return "ERROR";
  }
}