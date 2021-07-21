import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { Appointment } from "modules/treatments/infra/typeorm/entities/Appointment";
import { IAppointmentsRepository } from "modules/treatments/repositories/IAppointmentsRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAppointmentsByPetIdUseCase {
    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository,
        @inject("PetsRepository")
        private petsRepository: IPetsRepository
    ){}

    async execute(pet_id: string): Promise<Appointment[]> {
        const petExists = await this.petsRepository.findByID(pet_id);

        if(!petExists) {
            throw new AppError("Pet doesnt' exists!");
        }

        const appointments = await this.appointmentsRepository.listAppointmentsByPetId(pet_id);



        return appointments;
    }
}