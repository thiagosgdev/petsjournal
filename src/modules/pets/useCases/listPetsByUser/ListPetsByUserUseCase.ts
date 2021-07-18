import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { PetsRepository } from "modules/pets/infra/typeorm/repositories/PetsRepository";
import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListPetsByUserUseCase {
    constructor(
        @inject(PetsRepository)
        private petsRepository: IPetsRepository
    ){}

    async execute(user_id: string):Promise<Pet[]>{
        const pet = await this.petsRepository.findByUser(user_id);

        if(!pet) {
            throw new Error("No pet found for this User!");
        }

        return pet;
    }
}