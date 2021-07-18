import { Remedie } from "modules/treatments/infra/typeorm/entities/Remedie";
import { IRemediesRepository } from "modules/treatments/repositories/IRemediesRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRemediesByTreatmentIdUseCase {
    constructor(
        @inject("RemediesRepository")
        private remediesRepository: IRemediesRepository
    ){}

    async execute(treatment_id:string):Promise<Remedie[]> {
        const remedies = this.remediesRepository.listRemedieByTreatmentId(treatment_id);

        if(!remedies){
            throw new AppError("Not remedie found for this Treatment ID");
        }

        return remedies;
    }
}