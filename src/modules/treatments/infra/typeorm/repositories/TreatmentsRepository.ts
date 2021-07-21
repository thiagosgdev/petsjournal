import { ICreateTreatmentDTO } from "modules/treatments/dtos/ICreateTreatmentDTO";
import { ITreatmentsRepository } from "modules/treatments/repositories/ITreatmentsRepository";
import { getRepository, Repository } from "typeorm";
import { Treatment } from "../entities/Treatment";

export class TreatmentsRepository implements ITreatmentsRepository {
    private  repository: Repository<Treatment>;
    constructor(){
        this.repository = getRepository(Treatment)
    }
    async create({name, description, pet_id, appointment_id, remedie_id, start_date, end_date}: ICreateTreatmentDTO): Promise<Treatment> {
        const treatment = this.repository.create({
            name,
            description,
            remedie_id,
            start_date,
            end_date,
            appointment_id,
            pet_id,
        })
        await this.repository.save(treatment);

        return treatment;
    }
    async listTreatmentsByPetId(pet_id: string): Promise<Treatment[]> {
        const treatments = await this.repository.find({
            where: [{pet_id: pet_id}]
        })

        return treatments;
    }
    async findTreatmentById(id: string): Promise<Treatment> {
        const treatment = await this.repository.findOne(id);

        return treatment;
    }
    async findTreatmentByAppointmentId(appointment_id: string): Promise<Treatment> {
        throw new Error("Method not implemented.");
    }

    async listRemediesByPetId(pet_id: string): Promise<Treatment[]>{
        const remedies = await this.repository.find({
            where: {pet_id},
            relations: ["remedie"]
        })

        return remedies;
    }



}