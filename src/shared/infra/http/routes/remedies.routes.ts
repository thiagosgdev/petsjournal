import { Router } from "express";
import { CreateRemedieController } from "modules/treatments/useCases/createRemedies/CreateRemedieController";

const remediesRoutes = Router();



const createRemedieController =  new CreateRemedieController();


remediesRoutes.post("/", createRemedieController.handle);


export { remediesRoutes };