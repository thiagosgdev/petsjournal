import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRemediesByPetsIdUseCase } from "./ListRemediesByPetIdUseCase";

export class ListRemediesByPetIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {pet_id} = request.params;

        const listRemediesByPetId = container.resolve(ListRemediesByPetsIdUseCase);

        const remedies = await listRemediesByPetId.execute(pet_id);

        return response.status(200).json(remedies);
    }
}