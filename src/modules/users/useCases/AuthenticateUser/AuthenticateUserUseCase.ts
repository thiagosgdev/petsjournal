
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import auth from "config/auth";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";


interface IResponse {
    user: {
        name: string;

        email: string;
    };

    token: string;
    refresh_token: string;
}


@injectable()
export class AuthenticateUserUseCase { 
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private DateProvider: IDateProvider
    ){}

    async execute(email:string, password:string){
        const user = await this.usersRepository.findByEmail(email);

        const {
            secret_refresh_token,
            secret_token,
            expires_in_token,
            expires_in_refresh_token,
            expires_refresh_token_days
        } = auth;

        if(!user) {
            throw new Error("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email or password incorrect!");
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({email}, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.DateProvider.addDays(expires_refresh_token_days);

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token
        });

        const tokenReturn: IResponse = {
            token,

            user: {
                name: user.name,

                email: user.email,
            },

            refresh_token
        }

        return tokenReturn;
    }
}