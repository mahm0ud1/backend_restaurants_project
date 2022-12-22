import { Router } from "express";
import { FilesController } from "../controllers/filesController";

const router = Router();

router.post("/uploadImage", FilesController.uploadImage);
router.get("/:file_name", FilesController.downloadImage);

export default router;
