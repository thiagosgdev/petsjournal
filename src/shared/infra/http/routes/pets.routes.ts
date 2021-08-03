import { Router } from "express";
import { CreatePetController } from "modules/pets/useCases/createPet/CreatePetController";
import { ListPetsByNameController } from "modules/pets/useCases/listPetsByName/ListPetsByNameController";
import { ListPetsByUser } from "modules/pets/useCases/listPetsByUser/ListPetsByUserController";
import { ProfilePetController } from "modules/pets/useCases/profilePet/ProfilePetController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";



const petsRoutes = Router();

const createPetController = new CreatePetController();
const profilePetController = new ProfilePetController();
const listPetsByUserController = new ListPetsByUser();
const listPetsByNameController = new ListPetsByNameController();

petsRoutes.post("/", createPetController.handle);
petsRoutes.get("/search/:chip_number", profilePetController.handle);
petsRoutes.get("/users/:user_id", listPetsByUserController.handle);
petsRoutes.get("/search", listPetsByNameController.handle);


export { petsRoutes };