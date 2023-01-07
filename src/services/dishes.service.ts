import { DishesDal } from "../dal/dishes.dal";

export class DishesService {
  public async getRestaurantDishes(id: string) {
    const dal = new DishesDal();
    const res = await dal.getRestaurantDishes(id);
    return res;
  }

  public async getSignatureDishes() {
    const dal = new DishesDal();
    const res = await dal.getSignatureDishes();
    return res;
  }

  public async createDish(dish: any) {
    const dal = new DishesDal();
    const res = await dal.createDish(dish);
    return res;
  }

  public async getDishes() {
    const dal = new DishesDal();
    const res = await dal.getDishes();
    return res;
  }
}