import { PetsRepository } from "modules/pets/infra/typeorm/repositories/PetsRepository";
import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
export class ProfilePetUseCase {
    constructor(
        @inject(PetsRepository)
        private petsRepository: IPetsRepository
    ){}

    async execute(chip_number){
        const pet = await this.petsRepository.findByChip(chip_number);

        if(!pet){
            throw new AppError("Pet doesnt' exists!")
        }

        return pet;
    }
}


