import { Router } from "express";
import { CreateUserController } from "modules/users/useCases/createUsers/CreateUsersController";
import { ListUsersByNameController } from "modules/users/useCases/listUsersByName/ListUsersByNameController";
import { ProfileUserController } from "modules/users/useCases/profileUser/ProfileUserController";


const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const listUsersByNameController = new ListUsersByNameController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/search/:id", profileUserController.handle);
usersRoutes.get("/search", listUsersByNameController.handle);

export { usersRoutes };