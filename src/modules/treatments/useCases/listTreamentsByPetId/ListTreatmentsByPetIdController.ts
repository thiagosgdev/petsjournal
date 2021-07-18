import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTreatmentsByPetIdUseCase } from "./ListTreamentsByPetIdUseCase";

export class ListTreatmentsByPetIdController{
    
    async handle(request: Request, response: Response): Promise <Response> {
        const { pet_id } = request.body;

        const listTreatmentsByPetIdUseCase = container.resolve(ListTreatmentsByPetIdUseCase);

        const treatments = await  listTreatmentsByPetIdUseCase.execute(pet_id);

        return response.status(200).json(treatments);
    }
}