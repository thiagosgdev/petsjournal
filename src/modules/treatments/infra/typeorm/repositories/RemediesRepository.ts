import { ICreateRemediesDTO } from "modules/treatments/dtos/ICreateRemediesDTO";
import { IRemediesRepository } from "modules/treatments/repositories/IRemediesRepository";
import { getRepository, Repository } from "typeorm";
import { Remedie } from "../entities/Remedie";

export class RemediesRepository implements IRemediesRepository {

    private repository: Repository<Remedie>;

    constructor(){
        this.repository = getRepository(Remedie);
    }
    async create({name, expires_date,description}: ICreateRemediesDTO): Promise<Remedie> {
        const remedie = this.repository.create({
            name,
            expires_date,
            description
        })
        await this.repository.save(remedie);

        return remedie;
    }
    async findRemedieById(id: string): Promise<Remedie> {
        const remedie = await this.repository.findOne(id);

        return remedie;
    }
    async listRemedieByTreatmentId(treatment_id: string): Promise<Remedie[]> {
        const remedies = await this.repository.find({
            where: [{treatment_id: treatment_id}]
        });
        return remedies;
    }
}