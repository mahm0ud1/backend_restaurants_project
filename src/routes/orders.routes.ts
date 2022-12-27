import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller";

const router = Router();

router.get("/user/:userID", OrdersController.getChefs);
router.post("/createOrder", OrdersController.createOrder);

export default router;
