import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserUseCase } from "./ProfileUserUseCase";


class ProfileUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        
        const profileUserUseCase = container.resolve(ProfileUserUseCase);

        const user = await profileUserUseCase.execute({id});

        return response.status(200).json(user);

    }
}

export { ProfileUserController };