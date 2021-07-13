import { container } from "tsyringe";
import { CreatePetUseCase } from "./CreatePetUseCase";
import { Request, Response } from "express";


class CreatePetController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {  
            name,
            species,
            gender,
            breed,
            color,
            weight,
            birthdate,
            chip_number,
            chip_website,
            user_id } = request.body;

            const createPetUseCase = container.resolve(CreatePetUseCase);

            const pet = await createPetUseCase.execute({
                name,
                species,
                gender,
                breed,
                color,
                weight,
                birthdate,
                chip_number,
                chip_website,
                user_id,
            });

            return response.status(201).json(pet);
    }
}


export { CreatePetController };