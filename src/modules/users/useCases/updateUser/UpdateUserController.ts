import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password } = request.body;
        const { id } = request.user;

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const user = await updateUserUseCase.execute(id, name, password);

        return response.status(201).json(user);
    }
}