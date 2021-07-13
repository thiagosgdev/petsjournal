import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPetsByUserUseCase } from "./ListPetsByUserUseCase";


export class ListPetsByUser {
    async handle(request: Request, response: Response): Promise<Response>{
        const {user_id} = request.params;
        
        const listPetsByUserUseCase = container.resolve(ListPetsByUserUseCase);

        const pet = await listPetsByUserUseCase.execute(user_id);

        return response.status(200).json(pet);
    }
}