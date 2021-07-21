import { Request, Response} from "express";
import { container } from "tsyringe";
import { FindNextAppointmentByPetIdUseCase } from "./FindNextAppointmentByPetIdUseCase";

export class FindNextAppointmentByPetIdController {
    async handle(request: Request, response:Response): Promise<Response> {
        const {pet_id} = request.params;

        const findNextAppointmentByPetIdUseCase = container.resolve(FindNextAppointmentByPetIdUseCase);

        const appointment = await findNextAppointmentByPetIdUseCase.execute(pet_id);

        return response.status(200).json(appointment);
    }
}