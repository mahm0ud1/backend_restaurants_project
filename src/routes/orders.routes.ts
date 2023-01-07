import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller";
import { auth } from "../middleware/jwtAuth";

const router = Router();

router.get("/user/:userID", OrdersController.getChefs);
router.post("/createOrder", auth, OrdersController.createOrder);

export default router;
