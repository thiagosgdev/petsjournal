import { IUserResponseDTO } from "modules/users/dtos/IUserResponseDTO";
import { UserMap } from "modules/users/mapper/UserMap";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class ProfileUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({email}):Promise<IUserResponseDTO>{
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError ("User doesn't exists!");
        }

        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase };