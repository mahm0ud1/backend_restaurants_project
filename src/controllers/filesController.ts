import { Request, Response } from "express";
import { FilesService } from "../services/files.service";

export class FilesController {
  public static async uploadImage(req: Request, res: Response) {
    try {
      const service = new FilesService();
      const files = await service.uploadImage(req, res);
      return res.status(files.code).send(files.message);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async downloadImage(req: Request, res: Response) {
    try {
      const service = new FilesService();
      const files = await service.downloadImage(req.params.file_name);
      return files.pipe(res);
      // return res.status(200).end();
    } catch (error) {
      return res.send(error);
    }
  }
}