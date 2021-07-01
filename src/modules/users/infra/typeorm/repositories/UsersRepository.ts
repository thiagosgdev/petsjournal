import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
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

    async findById(id): Promise<User>{
        const user = await this.repository.findOne(id);
        return user;
    }

    async findByEmail(email): Promise<User>{
        const user = await this.repository.findOne({email});
        return user;
    }
}   


export { UsersRepository };