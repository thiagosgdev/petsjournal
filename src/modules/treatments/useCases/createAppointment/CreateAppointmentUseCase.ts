import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { ICreateAppointmentDTO } from "modules/treatments/dtos/ICreateAppointmentDTO";
import { Appointment } from "modules/treatments/infra/typeorm/entities/Appointment";
import { IAppointmentsRepository } from "modules/treatments/repositories/IAppointmentsRepository";
import { IDateProvider } from "shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateAppointmentUseCase {
    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("PetsRepository") 
        private petsRepository: IPetsRepository
    ){}

    async execute({name, description, date, pet_id}:ICreateAppointmentDTO):Promise<Appointment>{

        const petAlreadyExists = await this.petsRepository.findByID(pet_id);

        if(!petAlreadyExists){
            throw new AppError("Pet doesn't exists!");
        }

        const appointment = await this.appointmentsRepository.create({
            name, 
            description,
            date,
            pet_id
        });
        return appointment;
    }
}