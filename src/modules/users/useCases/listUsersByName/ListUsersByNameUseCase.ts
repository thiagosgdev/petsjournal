import { IUserResponseDTO } from "modules/users/dtos/IUserResponseDTO";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListUsersByNameUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(name: string): Promise<IUserResponseDTO[]> {
        const users = await this.usersRepository.listUsersByName(name);

        if(users.length === 0) {
            throw new AppError("No user found!");
        }

        return users;
    }
}