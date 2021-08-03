import { push } from "docker-compose";
import { ICreateTreatmentDTO } from "modules/treatments/dtos/ICreateTreatmentDTO";
import { Treatment } from "modules/treatments/infra/typeorm/entities/Treatment";
import { treatmentsRoutes } from "shared/infra/http/routes/treatments.routes";
import { ITreatmentsRepository } from "../ITreatmentsRepository";

export class TreatmentsRepositoryInMemory implements ITreatmentsRepository {

    treatments: Treatment[] = [];

    async create({
        name,
        description,
        pet_id,
        remedie_id,
        appointment_id,
        start_date,
        end_date
    }: ICreateTreatmentDTO): Promise<Treatment> {
        const treatment = new Treatment;

        Object.assign(treatment, {
            name,
            description,
            pet_id,
            remedie_id,
            appointment_id,
            start_date,
            end_date
        });

        this.treatments.push(treatment);

        return treatment;
    }
    
    async listTreatmentsByPetId(pet_id: string): Promise<Treatment[]> {
        const treatmentList = this.treatments.filter((treatment) => treatment.pet_id === pet_id);

        return treatmentList;
    }
    
    async findTreatmentById(id: string): Promise<Treatment> {
        const treatment = this.treatments.find((treatment) => treatment.id === id);

        return treatment;
    }
    
    async findTreatmentByAppointmentId(appointment_id: string): Promise<Treatment> {
        const treatment = this.treatments.find((treatment) => treatment.appointment_id === appointment_id);

        return treatment;
    }

    async listRemediesByPetId(pet_id: string): Promise<Treatment[]> {
        const treatmentList = this.treatments.filter((treatment) => treatment.pet_id === pet_id);
        
        return treatmentList;
    }
}