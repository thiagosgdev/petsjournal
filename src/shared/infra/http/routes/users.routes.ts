import { Router } from "express";
import { CreateUserController } from "modules/users/useCases/createUsers/CreateUsersController";


const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);


export { usersRoutes };