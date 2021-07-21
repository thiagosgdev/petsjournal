import { Request, Response} from "express";
import { container } from "tsyringe";
import { ListAppointmentsByPetIdUseCase } from "./ListAppointmentsByPetIdUseCase";


export class ListAppointmentsByPetIdController {
    async handle(request: Request, response: Response): Promise<Response> {

        const {pet_id} = request.body;

        const listAppointmentsByIdUseCase = container.resolve(ListAppointmentsByPetIdUseCase);

        const appointments = await listAppointmentsByIdUseCase.execute(pet_id);
        
        return response.status(200).json(appointments);
    }
}