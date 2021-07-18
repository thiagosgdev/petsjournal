import { ICreateRemediesDTO } from "../dtos/ICreateRemediesDTO";
import { Remedie } from "../infra/typeorm/entities/Remedie";

export interface IRemediesRepository {
    create(data: ICreateRemediesDTO):Promise<Remedie>;
    findRemedieById(id:string): Promise<Remedie>;
    listRemedieByTreatmentId(treatment_id: string): Promise<Remedie[]>;
}