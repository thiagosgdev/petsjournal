import { Router } from "express";
import { CreateUserController } from "modules/users/useCases/createUsers/CreateUsersController";
import { ListUsersByNameController } from "modules/users/useCases/listUsersByName/ListUsersByNameController";
import { ProfileUserController } from "modules/users/useCases/profileUser/ProfileUserController";
import { UpdateUserController } from "modules/users/useCases/updateUser/UpdateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const listUsersByNameController = new ListUsersByNameController();
const updateUserController = new UpdateUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/search/:email", profileUserController.handle);
usersRoutes.get("/search", listUsersByNameController.handle);
usersRoutes.put("/", ensureAuthenticated, updateUserController.handle);

export { usersRoutes };