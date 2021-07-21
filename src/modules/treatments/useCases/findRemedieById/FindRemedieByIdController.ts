import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindRemedieByIdUseCase } from "./FindRemedieByIdUseCase";

export class FindRemedieByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {remedie_id} = request.params;

        const findRemedieByIdUseCase = container.resolve(FindRemedieByIdUseCase);

        const remedie = await findRemedieByIdUseCase.execute(remedie_id);

        return response.status(200).json(remedie);
    }
}