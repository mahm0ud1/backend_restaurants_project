import { ChefsDal } from "../dal/chefs.dal";

export class ChefsService {
  public async getChefs() {
    const dal = new ChefsDal();
    const res = await dal.getChefs();
    return res;
  }

  public async getChef(params:Map<any,any>) {
    const dal = new ChefsDal();
    const res = await dal.getChefByID(params);
    return res;
  }

  public async createChef(chef: any) {
    const dal = new ChefsDal();
    const res = dal.createChef(chef);
    return res;
  }

  public async updateChef(chef: any) {
    const dal = new ChefsDal();
    const res = await dal.updateChef(chef);
    return res;
  }
}
