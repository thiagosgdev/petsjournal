import { ICreatePetDTO } from "modules/pets/dtos/ICreatePetDTO";
import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { IPetsRepository } from "../IPetsRepository";


export class PetsRepositoryInMemory implements IPetsRepository{

    pets: Pet[] = [];

    async create({
        name,
        species,
        gender,
        breed,
        color,
        weight,
        birthdate,
        chip_number,
        chip_website,
        user_id,        
        id,      
    }: ICreatePetDTO): Promise<Pet> {
        const pet = new Pet;

        Object.assign(pet, {
            name,
            species,
            gender,
            breed,
            color,
            weight,
            birthdate,
            chip_number,
            chip_website,
            user_id,        
            id,   
        });

        this.pets.push(pet);

        return pet;
    }
    async findByID(id: string): Promise<Pet> {
        const pet = this.pets.find((pet) => pet.id === id);

        return pet;
    }
    async findByChip(chip_number: string): Promise<Pet> {
        const pet = this.pets.find((pet) => pet.chip_number === chip_number);

        return pet;
    }
    async findByUser(user_id: string): Promise<Pet[]> {
        const pet = this.pets.filter((pet) => pet.user_id === user_id);

        return pet;
    }

}