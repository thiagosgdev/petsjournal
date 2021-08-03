import { hash } from "bcryptjs";
import { IUserResponseDTO } from "modules/users/dtos/IUserResponseDTO";
import { UserMap } from "modules/users/mapper/UserMap";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(user_id: string, name: string, password: string): Promise<IUserResponseDTO>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User not found!");
        }

        if(name){
            user.name = name;
        }

        if(password) {
            const passwordHash = await hash(password, 8);
            user.password = passwordHash;
        }

        await this.usersRepository.create(user);

        return UserMap.toDTO(user);
    }
}