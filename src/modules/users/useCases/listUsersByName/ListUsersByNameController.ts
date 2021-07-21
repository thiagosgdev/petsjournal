import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersByNameUseCase } from "./ListUsersByNameUseCase";

export class ListUsersByNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {name} = request.body;

        const listUsersByNameUseCase = container.resolve(ListUsersByNameUseCase);

        const users = await listUsersByNameUseCase.execute(name);

        return response.status(200).json(users);
    }
}