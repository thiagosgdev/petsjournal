import { ICreatePetDTO } from "../dtos/ICreatePetDTO";
import { Pet } from "../infra/typeorm/entities/Pet";


interface IPetsRepository {
    create(data: ICreatePetDTO):Promise<Pet>;
    findByID(id: string):Promise<Pet>;
    findByChip(chip_number: string): Promise<Pet>;
    findByUser(user_id: string): Promise<Pet[]>;
    listPetsByName(name: string): Promise<Pet[]>;
}

export { IPetsRepository }