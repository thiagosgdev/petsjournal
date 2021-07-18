import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";

export class CreateAppointmentController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, pet_id, date} = request.body;

        const createAppointmentUseCase = container.resolve(CreateAppointmentUseCase);

        const appointment = await createAppointmentUseCase.execute({
            name, 
            description, 
            pet_id, 
            date
        });

        return response.status(201).json(appointment);
    }
}