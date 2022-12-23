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
      const image = await service.downloadImage(req.params.file_name);
      if(image)
        return image.pipe(res);
      else
        return res.status(404).send("Image Not Found.");
    } catch (error) {
      return res.send(error);
    }
  }

  public static async deleteImage(req: Request, res: Response) {
    try {
      const service = new FilesService();
      const resMsg = await service.deleteImage(req.params.file_name);
      return res.send(resMsg);
    } catch (error) {
      return res.send(error);
    }
  }
}