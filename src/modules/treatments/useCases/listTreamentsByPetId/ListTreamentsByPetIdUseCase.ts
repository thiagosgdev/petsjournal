import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { Treatment } from "modules/treatments/infra/typeorm/entities/Treatment";
import { ITreatmentsRepository } from "modules/treatments/repositories/ITreatmentsRepository";
import { AppError } from "shared/errors/AppError";
import { treatmentsRoutes } from "shared/infra/http/routes/treatments.routes";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListTreatmentsByPetIdUseCase {

    constructor(
        @inject("TreatmentsRepository")
        private treatmentsRepository: ITreatmentsRepository,
        @inject("PetsRepository")
        private petsRepository: IPetsRepository
    ){}

    async execute(pet_id: string) : Promise<Treatment[]>{

        const petExists = await this.petsRepository.findByID(pet_id);

        if(!petExists) {
            throw new AppError("Pet id doesn't exists,");
        }
        const treatments = await this.treatmentsRepository.listTreatmentsByPetId(pet_id);

        if(!treatments) {
            throw new AppError("No treatment found for this Pet ID");
        }
        return treatments;
    }
}