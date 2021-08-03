import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { v4 as uuidV4 } from "uuid";



export class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({name, email, password}: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,            
            password,
            id: uuidV4()
        })

        this.users.push(user);

    }
    async findById(id: any): Promise<User> {
        const user = this.users.find((user) => user.id === id);
        return user;
    }
    async findByEmail(email: any): Promise<User> {
        const user = this.users.find((user) => user.email === email);
        return user;
    }

    async listUsersByName(name: string): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}