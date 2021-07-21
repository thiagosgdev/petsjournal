import { ICreateTreatmentDTO } from "../dtos/ICreateTreatmentDTO";
import { Treatment } from "../infra/typeorm/entities/Treatment";

export interface ITreatmentsRepository {
    create(data:ICreateTreatmentDTO):Promise<Treatment>;
    listTreatmentsByPetId(pet_id: string): Promise<Treatment[]>;
    findTreatmentById(id: string):Promise<Treatment>;
    findTreatmentByAppointmentId(appointment_id: string):Promise<Treatment>;
    listRemediesByPetId(pet_id:string): Promise<Treatment[]>;
}