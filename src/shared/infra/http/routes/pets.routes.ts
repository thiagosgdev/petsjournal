import { Router } from "express";
import { CreatePetController } from "modules/pets/useCases/createPet/CreatePetController";
import { ListPetsByUser } from "modules/pets/useCases/listPetsByUser/ListPetsByUserController";
import { ProfilePetController } from "modules/pets/useCases/profilePet/ProfilePetController";



const petsRoutes = Router();

const createPetController = new CreatePetController();
const profilePetController = new ProfilePetController();
const listPetsByUser = new ListPetsByUser();

petsRoutes.post("/", createPetController.handle);
petsRoutes.get("/:chip_number", profilePetController.handle);
petsRoutes.get("/users/:user_id", listPetsByUser.handle)


export { petsRoutes };