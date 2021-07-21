
import { ICreatePetDTO } from "modules/pets/dtos/ICreatePetDTO";
import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { getRepository, Like, Repository } from "typeorm";
import { Pet } from "../entities/Pet";


class PetsRepository implements IPetsRepository{

    private repository: Repository<Pet>;

    constructor(){
        this.repository = getRepository(Pet);
    }

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
        const pet =  this.repository.create({
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
            id
        });

        await this.repository.save(pet);

        return pet;

    }

    async findByID(id: string): Promise<Pet> {
        const pet = await this.repository.findOne(id);
        return pet;

    }
    async findByChip(chip_number: string): Promise<Pet> {
        const pet = await this.repository.findOne({chip_number});
        return pet;
    }
    async findByUser(user_id: string): Promise<Pet[]> {
        // const pet = await this.repository.find({            
        //     where: {user_id},
        //     relations: ["user"],
        // });

        const pet = await this.repository.createQueryBuilder("pets")
            .leftJoin("pets.user", "user")
            .select("pets")
            .addSelect("user.name") 
            .addSelect("user.email")           
            .where("pets.user_id = :user_id", { user_id})
            .getMany();                
        return pet;
    }

    async listPetsByName(name: string) : Promise<Pet[]> {
        const pets = await this.repository.find({
            where: [{name: Like(`%${name}%`)}]
        })

        return pets;
    }
}

export { PetsRepository }