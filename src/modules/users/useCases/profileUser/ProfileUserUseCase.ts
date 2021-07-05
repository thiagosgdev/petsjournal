import { User } from "modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ProfileUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({id}):Promise<User>{
        const user = await this.usersRepository.findById(id);
        if(!user){
            throw new Error ("User doesn't exists!");
        }

        return user;
    }
}

export { ProfileUserUseCase };