import Chefs from "../db/models/chefs";
import { Increment } from 'mongoose-auto-increment-ts'

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
      chef = new Chefs({
        id: id,
        name: chef.name,
        age: chef.age,
        about: chef.about
      });

      chef.save(function (err: any, results: any) {
        if (err) {
          throw err;
        }
        return results;
      });
    }
    return "ERROR";
  }

  public async updateChef(chef: any) {
    const data = await Chefs.findOne({
      id: chef.id,
    }).updateOne({
      $set: {
        name: chef.name,
        age: chef.age,
        about: chef.about,
      }
    });
    return data;
  }

  public findAll(query: any = null) {
    return Chefs.find(query);
  }

  public async getChef(param: { [key: string]: string }) {
    const data = await Chefs.aggregate([
      { $match: { name: `${param.name}` } },
      {
        $lookup: {
          localField: "restaurants",
          foreignField: "_id",
          from: "restaurants",
          as: "restaurants",
        },
      },
    ]);
    return data;
  }
}
