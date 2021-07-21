import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { Treatment } from "modules/treatments/infra/typeorm/entities/Treatment";
import { ITreatmentsRepository } from "modules/treatments/repositories/ITreatmentsRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRemediesByPetsIdUseCase {
    constructor(
        @inject("TreatmentsRepository")
        private treatmentsRepository: ITreatmentsRepository,
        @inject("PetsRepository")
        private petsRepository: IPetsRepository
    ){}

    async execute(pet_id:string):Promise<Treatment[]> {
        const petExists =  await this.petsRepository.findByID(pet_id);

        if(!petExists){
            throw new AppError("Pet ID doesn't exists!");
        }

        const remedies = await this.treatmentsRepository.listRemediesByPetId(pet_id);

        return remedies;
    }
}