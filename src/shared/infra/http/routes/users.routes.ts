import { Router } from "express";
import { CreateUserController } from "modules/users/useCases/createUsers/CreateUsersController";
import { ProfileUserController } from "modules/users/useCases/profileUser/ProfileUserController";


const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:id", profileUserController.handle);

export { usersRoutes };