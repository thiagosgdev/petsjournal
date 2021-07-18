import { Router } from "express";
import { appointmentsRoutes } from "./appointments.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { petsRoutes } from "./pets.routes";
import { remediesRoutes } from "./remedies.routes";
import { treatmentsRoutes } from "./treatments.routes";
import { usersRoutes } from "./users.routes";

const router = Router();


router.use("/users", usersRoutes);
router.use("/pets", petsRoutes);
router.use("/remedies", remediesRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/treatments", treatmentsRoutes);
router.use("/", authenticateRoutes);


export { router };