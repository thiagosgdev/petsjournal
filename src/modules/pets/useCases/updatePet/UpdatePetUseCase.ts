import { ICreatePetDTO } from "modules/pets/dtos/ICreatePetDTO";
import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdatePetUseCase {
    constructor(
        @inject("PetsRepository")
        private petsRepository: IPetsRepository
    ){}

    async execute(data:ICreatePetDTO){
        
    }
}