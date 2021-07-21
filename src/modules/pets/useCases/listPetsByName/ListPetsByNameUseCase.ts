import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListPetsByNameUseCase {
    constructor(
        @inject("PetsRepository")
        private petsRepository: IPetsRepository
    ){}

    async execute(name: string): Promise<Pet[]> {
        const pets = await this.petsRepository.listPetsByName(name);

        if(pets.length === 0){
            throw new AppError("No pet found.")
        }

        return pets;
    }
}