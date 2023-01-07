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

  public async getSignatureDishes() {
    const data = await Dishes.aggregate([
      {
        $group: {
          _id: "$signature",
          title: { $first: "$name" },
          imageUrl: { $first: "$imageUrl" },
          price: { $first: "$price" },
          details: { $first: "$about" },
          dishType: { $first: "$dishType" },
          signature: { $first: "$signature" },
          restaurantID: { $first: "$restaurantID" },
        },
      },
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
          "id": 1,
          "title": 1,
          "imageUrl": 1,
          "price": 1,
          "details": 1,
          "dishType": 1,
          "signature": 1,
          "restaurant.id": 1,
        }
      },
    ]);
    if (data && data.length !== 0)
      return data.map(d => {
        return {
          title: d.title,
          imageUrl: d.imageUrl,
          price: d.price,
          details: d.details,
          dishType: d.dishType,
          signature: d.signature,
          restaurantID: d.restaurant[0].id
        }
      });

    return "ERROR";
  }

  public async getRestaurantDishes(id: string) {
    try {
      const data = await Restaurants.aggregate([
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
            "id": 1,
            "name": 1,
            "imageUrl": 1,
            "price": 1,
            "about": 1,
            "dishType": 1,
            "signature": 1,
            "restaurant.id": 1,
            "restaurant.name": 1,
            "restaurant.about": 1,
          }
        },
      ]);
      if (data && data.length !== 0)
        return data;
    }
    catch (error) {
      console.log(error);
    }
    return "ERROR";
  }

  public async createDish(dish: any) {
    try {
      if (dish.restaurantID !== undefined) {
        const resturantID = dish.restaurantID;
        const data = await Restaurants.findOne({ id: resturantID });
        if (data) {
          const id = await DishesDal.getIncrementDishID();
          dish = new Dishes({
            id: id,
            name: dish.name,
            restaurantID: dish.restaurantID,
            imageUrl: dish.imageUrl,
            price: dish.price,
            about: dish.about,
            dishType: dish.dishType,
            signature: dish.signature,
          });

          const response = await Dishes.create(dish);
          if (response)
            return "Created";
        }
        else {
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
          "id": 1,
          "name": 1,
          "imageUrl": 1,
          "price": 1,
          "about": 1,
          "dishType": 1,
          "signature": 1,
          "restaurant.id": 1,
          "restaurant.name": 1,
          "restaurant.about": 1,
        }
      },
    ]);
    if (data && data.length !== 0)
      return data;

    return "ERROR";
  }
}