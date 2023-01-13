import { Increment } from "mongoose-auto-increment-ts";
import Chefs from "../db/models/chefs";
import Restaurants from "../db/models/restaurants";

export class RestaurantsDal {
  private static async getIncrementRestaurantID() {
    let RestaurantID = null;
    await Increment('restaurants').then(
      id => RestaurantID = id
    );
    return RestaurantID;
  }

  public async getPopularRestaurants() {
    const data = await Restaurants.aggregate([
      { $sort : { rate: -1 } },
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
          "imageUrl": 1,
          "rate": 1,
          "timeOpen": 1,
          "chef.name": 1,
          "createdAt": 1,
          "updatedAt": 1
        }
      },
      { $limit: 3}
    ]);
    if(data)
    {
      const redesignedData:any[] = data.map(d=>{
        const chefName = (d.chef.length == 1)?d.chef[0].name:"";
        return {
          id: d.id,
          name: d.name,
          about: chefName,
          created_date: d.createdAt,
          imageUrl: d.imageUrl,
          rate: d.rate,
          timeOpen: d.timeOpen
        }
      });

      return redesignedData;
    }
  }

  public async getRestaurant(id: Number) {
    const data = await Restaurants.aggregate([
      {
        $match: { id: id}
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
        $lookup: {
          localField: "id",
          foreignField: "restaurantID",
          from: "dishes",
          as: "dishes",
        }
      },
      {
        $project: {
          "_id": 0,
          "id": 1,
          "name": 1,
          "imageUrl": 1,
          "rate": 1,
          "timeOpen": 1,
          "chef.name": 1,
          "dishes.id": 1,
          "dishes.name": 1,
          "dishes.price": 1,
          "dishes.imageUrl": 1,
          "dishes.about": 1,
          "dishes.dishType": 1,
          "dishes.signature": 1,
          "createdAt": 1,
          "updatedAt": 1
        }
      },
    ]);
    if(data && data.length == 1)
    {
      const chefName = (data[0].chef.length == 1)?data[0].chef[0].name:null;
      const redesignedData = {
        restaurant: {
          id: data[0].id,
          name: data[0].name,
          about: chefName,
          created_date: data[0].createdAt,
          imageUrl: data[0].imageUrl,
          rate: data[0].rate,
          timeOpen: data[0].timeOpen
        },
        dishes: data[0].dishes
      }

      return redesignedData;
    }
  }

  public async createRestaurant(restaurant: any) {
    try {
      if (restaurant.chefID !== undefined) {
        const data = await Chefs.findOne({ id: restaurant.chefID });
        if (data) {
          const id = await RestaurantsDal.getIncrementRestaurantID();
          restaurant = new Restaurants({
            id: id,
            name: restaurant.name,
            chefID: restaurant.chefID,
            imageUrl: restaurant.imageUrl,
            rate: restaurant.rate,
            timeOpen: restaurant.timeOpen,
          });

          const response = await Restaurants.create(restaurant);
          if (response)
            return "Created";
        }
      }
    }
    catch (err) {
      console.log(err);
    }
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
          "id": 1,
          "name": 1,
          "imageUrl": 1,
          "rate": 1,
          "timeOpen": 1,
          "chef.name": 1,
          "createdAt": 1,
          "updatedAt": 1
        }
      },
    ]);
    if (data && data.length !== 0) {
      const restaurants:any[] = []
      data.forEach((d,i)=>{
        const chefName = (d.chef.length > 0)?d.chef[0].name:"";
        restaurants[i] = {
          id: d.id,
          imageUrl: d.imageUrl,
          title: d.name,
          details: chefName,
          created_date: d.createdAt,
          rate: d.rate,
          timeOpen: d.timeOpen
        }
      })
      return restaurants;

    }
    return {
      status: "ERROR"
    }
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
            "imageUrl": 1,
            "chef_restaurants.name": 1,
            "chef_restaurants.imageUrl": 1,
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