import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({
        name,
        email,
        password
    }:ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if(userAlreadyExists){
            throw new Error("User already exists!");
        }

        const passwordHash =password;

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
        });
    }
}

export { CreateUserUseCase };