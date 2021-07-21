import { ICreateAppointmentDTO } from "../dtos/ICreateAppointmentDTO";
import { Appointment } from "../infra/typeorm/entities/Appointment";

export interface IAppointmentsRepository {
    create(data:ICreateAppointmentDTO):Promise<Appointment>;
    findAppointmentById(id: string):Promise<Appointment>;
    listAppointmentsByPetId(pet_id: string):Promise<Appointment[]>;
    listAppointmentsByPetIdByDate(pet_id: string, date:Date):Promise<Appointment[]>;
    findNextAppointmentByDateByPetId(date: Date, pet_id: string): Promise<Appointment>;
}