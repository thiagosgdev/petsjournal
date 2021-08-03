import { ICreateRemediesDTO } from "modules/treatments/dtos/ICreateRemediesDTO";
import { Remedie } from "modules/treatments/infra/typeorm/entities/Remedie";
import { IRemediesRepository } from "../IRemediesRepository";


export class RemediesRepositoryInMemory implements IRemediesRepository {

    remedies: Remedie[] = [];

    async create({
        name,
        description,
        expires_date
        }: ICreateRemediesDTO): Promise<Remedie> {
        const remedie = new Remedie;

        Object.assign(remedie,{
            name,
            description,
            expires_date
        });

        this.remedies.push(remedie);

        return remedie;
    }
    async findRemedieById(id: string): Promise<Remedie> {
        const remedie = this.remedies.find((remedie) => remedie.id === id);
        return remedie;
    }
    async listRemedieByTreatmentId(treatment_id: string): Promise<Remedie[]> {
        // const remediesList = this.tratments.filter((treatment) => treatment.id === treatment_id) GET A WAY TO ONLY SHOW THE REMEDIES
        return null;
    }
    async listRemediesByName(name: string): Promise<Remedie[]> {
        const remedieList = this.remedies.filter((remedie) => remedie.name = name);
        return remedieList;
    }

}