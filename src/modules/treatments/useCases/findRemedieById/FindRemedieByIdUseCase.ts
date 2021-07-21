import { Remedie } from "modules/treatments/infra/typeorm/entities/Remedie";
import { IRemediesRepository } from "modules/treatments/repositories/IRemediesRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindRemedieByIdUseCase {
    constructor(
        @inject("RemediesRepository")
        private remediesRepository: IRemediesRepository
    ){}

    async execute(remedie_id: string): Promise<Remedie> {
        const remedie = await this.remediesRepository.findRemedieById(remedie_id);

        if(!remedie) {
            throw new AppError("Remedie not found!");
        }

        return remedie;
    }

}