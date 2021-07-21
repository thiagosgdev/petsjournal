import { Router } from "express";
import { CreateRemedieController } from "modules/treatments/useCases/createRemedies/CreateRemedieController";
import { FindRemedieByIdController } from "modules/treatments/useCases/findRemedieById/FindRemedieByIdController";
import { ListRemediesByNameController } from "modules/treatments/useCases/listRemediesByName/ListRemediesByNameController";


const remediesRoutes = Router();



const createRemedieController =  new CreateRemedieController();
const listRemediesByNameController = new ListRemediesByNameController();
const findRemedieById = new FindRemedieByIdController();


remediesRoutes.post("/", createRemedieController.handle);
remediesRoutes.get("/search/name", listRemediesByNameController.handle);
remediesRoutes.get("/search/:id", findRemedieById.handle);

export { remediesRoutes };