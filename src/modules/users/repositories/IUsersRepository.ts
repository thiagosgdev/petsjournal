import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findById(id): Promise<User>;
    findByEmail(email): Promise<User>;
}

export { IUsersRepository };