import { Router } from "express";
import { ChefsController } from "../controllers/chefsController";

const router = Router();

router.get("/getChefs", ChefsController.getChefs);
router.get("/getChef", ChefsController.getChef);
router.get("/getChefOfTheWeek", ChefsController.getChefOfTheWeek);
router.post("/createChef", ChefsController.createChef);
router.put("/updateChef", ChefsController.updateChef);

export default router;
