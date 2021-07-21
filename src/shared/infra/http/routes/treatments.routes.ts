import { Router } from "express";
import { CreateTreatmentController } from "modules/treatments/useCases/createTreatments/CreateTreatmentController";
import { ListRemediesByPetIdController } from "modules/treatments/useCases/listRemediesByPetId/ListRemediesByPetIdController";
import { ListTreatmentsByPetIdController } from "modules/treatments/useCases/listTreamentsByPetId/ListTreatmentsByPetIdController";


const treatmentsRoutes = Router();

const createTreatmentController = new CreateTreatmentController();
const listTreatmentsByPetIdController = new ListTreatmentsByPetIdController();
const listRemediesByPetIdController = new ListRemediesByPetIdController();

treatmentsRoutes.post("/", createTreatmentController.handle);
treatmentsRoutes.get("/", listTreatmentsByPetIdController.handle);
treatmentsRoutes.get("/remedies/:pet_id", listRemediesByPetIdController.handle);


export { treatmentsRoutes };