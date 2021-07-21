import { Remedie } from "modules/treatments/infra/typeorm/entities/Remedie";
import { IRemediesRepository } from "modules/treatments/repositories/IRemediesRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRemediesByNameUseCase {
    constructor(
        @inject("RemediesRepository")
        private remediesRepository: IRemediesRepository
    ){}

    async execute(name: string): Promise<Remedie[]> {
        const remedies = await this.remediesRepository.listRemediesByName(name);

        if(remedies.length === 0) {
            throw new AppError("No remedie found.")
        }

        return remedies;
    }
}