import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { ICreateTreatmentDTO } from "modules/treatments/dtos/ICreateTreatmentDTO";
import { Treatment } from "modules/treatments/infra/typeorm/entities/Treatment";
import { IAppointmentsRepository } from "modules/treatments/repositories/IAppointmentsRepository";
import { ITreatmentsRepository } from "modules/treatments/repositories/ITreatmentsRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateTreatmentUseCase {

    constructor(
        @inject("TreatmentsRepository")
        private treatmentsRepository: ITreatmentsRepository,
        @inject("PetsRepository")
        private petsRepository: IPetsRepository,
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository
    ){}

    async execute({name, description, pet_id, appointment_id, remedie_id, start_date, end_date}:ICreateTreatmentDTO):Promise<Treatment> {
        const petExists = this.petsRepository.findByID(pet_id);

        if(!petExists) {
            throw new AppError("Pet doesn't exists.");
        }

        if(appointment_id){
            const appointmentExists = this.appointmentsRepository.findAppointmentById(appointment_id);

            if(!appointmentExists) {
                throw new AppError("Appointment doesn't exists!");
            }
        }

        const treatment = this.treatmentsRepository.create({
            name,
            description,
            pet_id,
            appointment_id,
            remedie_id,
            start_date,
            end_date
        });
        
        return treatment;
    }
}