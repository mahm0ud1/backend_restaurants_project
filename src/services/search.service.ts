import { SearchDal } from "../dal/search.dal";

export class SearchService {
  public async searchValue(searchingValue: String) {
    const dal = new SearchDal();
    const res = await dal.searchValue(searchingValue);
    return res;
  }
}