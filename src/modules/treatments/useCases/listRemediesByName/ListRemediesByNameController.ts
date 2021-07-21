import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRemediesByNameUseCase } from "./ListRemediesByNameUseCase";

export class ListRemediesByNameController {
    async handle(request: Request, response: Response):Promise<Response> {
        const {name} = request.body;

        const listRemediesByNameUseCase = container.resolve(ListRemediesByNameUseCase);

        const remedies = await listRemediesByNameUseCase.execute(name);

        return response.status(200).json(remedies);
    }
}