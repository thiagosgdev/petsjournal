import { Router } from "express";
import { CreateTreatmentController } from "modules/treatments/useCases/createTreatments/CreateTreatmentController";
import { ListTreatmentsByPetIdController } from "modules/treatments/useCases/listTreamentsByPetId/ListTreatmentsByPetIdController";


const treatmentsRoutes = Router();

const createTreatmentController = new CreateTreatmentController();
const listTreatmentsByPetIdController = new ListTreatmentsByPetIdController();

treatmentsRoutes.post("/", createTreatmentController.handle);
treatmentsRoutes.get("/", listTreatmentsByPetIdController.handle);


export { treatmentsRoutes };