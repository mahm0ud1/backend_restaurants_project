import { Request, Response } from "express";
import { SearchService } from "../services/search.service";

export class SearchController {
  public static async searchValue(req: Request, res: Response) {
    try {
        const searchingValue: String = req.params.searchValue;
        const service = new SearchService();
        const searchValue = await service.searchValue(searchingValue);
        return res.send(searchValue);
      }
      catch (error) {
        console.log(error);
      }
      return "ERROR";
  }
}