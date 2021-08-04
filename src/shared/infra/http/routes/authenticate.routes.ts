import { Router } from "express";
import { AuthenticateUserController } from "modules/users/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "modules/users/useCases/refreshToken/RefreshTokenController";


const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();


authenticateRoutes.post("/login", authenticateUserController.handle);
authenticateRoutes.get("/refresh-token", refreshTokenController.handle);


export { authenticateRoutes };

