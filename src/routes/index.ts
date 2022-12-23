import express from "express";
import chefsRoutes from "./chefs.routes";
import restaurantsRoutes from "./restaurants.routes";
import filesRoute from './files.routes'

const router = express.Router();

router.use("/api/chefs/", chefsRoutes);
router.use("/api/restaurants/", restaurantsRoutes);
router.use("/api/files/", filesRoute);

export default router;
