import { Router } from "express";
import { SearchController } from "../controllers/SearchController";

const router = Router();

router.get("/:searchValue", SearchController.searchValue);

export default router;