import { Increment } from "mongoose-auto-increment-ts";
import Orders from "../db/models/orders";

export class OrdersDal {
  private async getIncrementOrderID() {
    let orders = null;
    await Increment('orders').then(
      id => orders = id
    );
    return orders;
  }

  public async getUserOrders(userID: any) {
    try {
      userID = Number(userID);
      if (userID !== "") {
        const data = await Orders.aggregate([
          {
            $match: {
              userID: userID
            }
          },
          {
            $lookup: {
              localField: "dishID",
              foreignField: "id",
              from: "dishes",
              as: "dish",
            }
          },
          {
            $project: {
              "_id": 0,
              "id": 1,
              "count": 1,
              "dish.id": 1,
              "dish.name": 1,
              "dish.imageUrl": 1,
              "dish.price": 1,
              "dish.about": 1,
              "dish.dishType": 1,
              "dish.signature": 1,
            }
          },
        ]);
        if (data) {
          const orders: any[] = []
          data.forEach((order, i) => orders[i] = {
            orderID: order.id,
            count: order.count,
            ...order.dish[0]
          })
          return orders;
        }
      }
    }
    catch (error) {
      console.log(error);
    }

    return {
      status: "ERROR"
    };
  }

  public async createOrder(userID: number, order: any) {
    const {dishID, count, dishOptions} = order;
    var query = { userID: userID, dishID: order.dishID, dishOptions: dishOptions },
      update = {
        $inc: {
          count: order.count
        }
      },
      options = {};

    const resData = await new Promise<String>((resolve, reject) => {
      Orders.findOneAndUpdate(query, update, options, async (error, result) => {
        if (error) return;
        if (!result) {
          const id = await this.getIncrementOrderID();
          if (id !== null) {
            const chefInfo = {
              id: id,
              userID: userID,
              dishID: dishID,
              count: count,
              dishOptions: dishOptions
            }
            order = new Orders(chefInfo);

            order.save(function (err: any, results: any) {
              if (err) {
                resolve("ERROR");
              }
              else {
                resolve("added");
              }
            });
          }
        }
        else {
          resolve("added");
        }
      })
    });
    return resData;
  };
}