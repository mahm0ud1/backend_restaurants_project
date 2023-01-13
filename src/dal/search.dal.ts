import Restaurants from "../db/models/restaurants";
import Chefs from "../db/models/chefs";
import Dishes from "../db/models/dishes";

export class SearchDal {
    public async searchValue(searchingValue: String) {
        const restaurantsResults = await Restaurants.aggregate([
            {
                $match: { name: { "$regex": searchingValue, "$options": "i" }}
            },
            {
                $project: {
                    "_id": 0,
                    restaurantID: { $substr: ["$id", 0, -1] },
                    value: "$name"
                }
            },
            {
                $addFields: {
                    url: { $concat: ["/restaurant/", "$restaurantID"] },
                }
            }
        ]);
        const cusineResults = await Dishes.aggregate([
            {
                $match: { name: { "$regex": searchingValue, "$options": "i" }}
            },
            {
                $project: {
                    "_id": 0,
                    dishID: { $substr: ["$id", 0, -1] },
                    restaurantID: { $substr: ["$restaurantID", 0, -1] },
                    value: "$name"
                }
            },
            {
                $addFields: {
                    url: { $concat: ["/restaurant/", "$restaurantID", "/dish/", "$dishID"] },
                }
            }
        ]);
        const chefsResults = await Chefs.aggregate([
            {
                $match: { name: { "$regex": searchingValue, "$options": "i" }}
            },
            {
                $project: {
                    "_id": 0,
                    chefID: { $substr: ["$id", 0, -1] },
                    value: "$name"
                }
            },
            {
                $addFields: {
                    url: { $concat: ["/chef/", "$chefID"] },
                }
            }
        ]);

        return {
            searchResultsSections: [
                {
                    sectionTitle: "Restaurants",
                    sectionResults: restaurantsResults
                },
                {
                    sectionTitle: "Cusine",
                    sectionResults: cusineResults
                },
                {
                    sectionTitle: "Chef",
                    sectionResults: chefsResults
                },
            ]
        };
    }
}