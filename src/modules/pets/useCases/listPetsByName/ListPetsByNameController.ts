import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPetsByNameUseCase } from "./ListPetsByNameUseCase";

export class ListPetsByNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {name} = request.body;

        const listPetsByNameUseCase = container.resolve(ListPetsByNameUseCase);

        const pets = await listPetsByNameUseCase.execute(name);

        return response.status(200).json(pets)
    }

}