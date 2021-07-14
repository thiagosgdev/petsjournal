
import { ICreatePetDTO } from "modules/pets/dtos/ICreatePetDTO";
import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePetUseCase {
    constructor(
        @inject("PetsRepository")
        private petsRepository: IPetsRepository
    ){}

    async execute({
        name,
        species,
        gender,
        breed,
        color,
        weight,        
        birthdate,
        chip_number,
        chip_website,
        user_id
    }:ICreatePetDTO):Promise<Pet>{
        const petAlreadyExists = await this.petsRepository.findByChip(chip_number);

        if(petAlreadyExists){
            throw new AppError("Pet already Exists!");
        }

       const pet =  await this.petsRepository.create({
            name,
            species,
            gender,
            breed,
            color,
            weight,            
            birthdate,
            chip_number,
            chip_website,
            user_id
        });

        return pet;

    }
}

export { CreatePetUseCase };