import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRemedieUseCase } from "./CreateRemedieUseCase";

export class CreateRemedieController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {name, description, expires_date} = request.body;

        const createRemedieUseCase = container.resolve(CreateRemedieUseCase);

        const remedie = await createRemedieUseCase.execute({
            name,
            description,
            expires_date
        });

        return response.status(201).json(remedie);
    }
}