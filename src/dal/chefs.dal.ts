import Chefs from "../db/models/chefs";
import { Increment } from 'mongoose-auto-increment-ts'
import epicureData from "../db/models/epicureData";

const chefOfTheWeek:String = "chefOfTheWeek";
export class ChefsDal {
  private async getIncrementChefID() {
    let chefID = null;
    await Increment('chefs').then(
      id => chefID = id
    );
    return chefID;
  }

  public async createChef(chef: any) {
    const id = await this.getIncrementChefID();
    if (id !== null) {
      const chefInfo = {
        id: id,
        name: chef.name,
        age: chef.age,
        about: chef.about,
        imageURL: chef.imageURL,
      }
      chef = new Chefs(chefInfo);

      chef.save(function (err: any, results: any) {
        if (err) {
          throw err;
        }
        return results;
      });
      return {
        status: "Created",
        data: chefInfo
      };
    }
    return {
      status: "ERROR"
    };
  }

  public async updateChef(chef: any) {
    const data = await Chefs.findOne({
      id: chef.id,
    }).updateOne({
      $set: {
        name: chef.name,
        age: chef.age,
        about: chef.about,
        imageURL: chef.imageURL,
      }
    });
    return data;
  }

  public getChefs(query: any = null) {
    return Chefs.find(query)
      .select({
        "_id": 0,
        "id": 1,
        "name": 1,
        "age": 1,
        "imageURL": 1,
        "about": 1
      });
  }

  public async getChefByID(params: any) {
    const {id, restaurantsIncluded} = params;
    if (id !== undefined) {
      const options = (restaurantsIncluded === "true") ?
        [{
          $lookup: {
            localField: "id",
            foreignField: "chefID",
            from: "restaurants",
            as: "chef_restaurants",
          }
        }] : [];
      const data = await Chefs.aggregate([
        {
          $match: { id: parseInt(id) }
        },
        ...options
        ,
        {
          $project: {
            "_id": 0,
            "id": 1,
            "name": 1,
            "age": 1,
            "imageUrl": 1,
            "about": 1,
            "chef_restaurants.id": 1,
            "chef_restaurants.name": 1,
            "chef_restaurants.imageUrl": 1,
          }
        },
        { $limit: 1 },
      ]);
      if (data && data.length !== 0)
        return data[0];
    }
    return "ERROR";
  }

  public async getChefOfTheWeek() {
    const data = await epicureData.findOne({ key: chefOfTheWeek });
    if (data) {
      const params = {id: data.value, restaurantsIncluded: "true"};
      return this.getChefByID(params);
    }
    return "Not Found"
  }
}
