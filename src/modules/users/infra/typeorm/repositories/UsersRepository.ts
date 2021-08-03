import { response } from "express";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { getRepository, Like, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        email,
        password,
        id
    }:ICreateUserDTO): Promise<void>{
        const user = this.repository.create({
            name,
            email,
            password,
            id
        });

        await this.repository.save(user);
    }

    async findById(id: string): Promise<User>{
        const user = await this.repository.findOne(id);
        return user;
    }

    async findByEmail(email:string): Promise<User>{
        const user = await this.repository.findOne({email});
        return user;
    }

    async listUsersByName(name: string): Promise<User[]> {
        const users = await this.repository.find({
            select:["id","name", "email","created_at","updated_at"],
            where: [{name: Like(`%${name}%`)}]
        })

        return users;
    }
}   


export { UsersRepository };