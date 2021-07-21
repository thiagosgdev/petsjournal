import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTreatmentUseCase } from "./CreateTreatmentUseCase";


export class CreateTreatmentController {
    async handle (request: Request, response: Response): Promise<Response> {
        const {name, description, pet_id, appointment_id, remedie_id, start_date, end_date} = request.body;

        const createTreatmentUseCase = container.resolve(CreateTreatmentUseCase);

        const treatment = await createTreatmentUseCase.execute({
            name,
            description,
            pet_id,
            appointment_id,
            remedie_id,
            start_date,
            end_date
        });

        return response.status(201).json(treatment);
    }
}