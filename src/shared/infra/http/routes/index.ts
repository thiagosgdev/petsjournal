import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { petsRoutes } from "./pets.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/pets", petsRoutes);
router.use("/", authenticateRoutes);


export { router };