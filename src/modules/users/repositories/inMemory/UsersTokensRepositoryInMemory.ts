import { ICreateUserTokenDTO } from "modules/users/dtos/ICreateUserTokenDTO";
import { UserTokens } from "modules/users/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository{

    usersToken: UserTokens[] = [];
    
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id
        })

        this.usersToken.push(userToken);

        return userToken;
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersToken.find((token) => 
            token.user_id === user_id && 
            token.refresh_token === refresh_token
        )

        return userToken;
    }
    async deleteById(id: string): Promise<void> {
        this.usersToken.forEach( (item, index) => {
            if(id === item.id)
                this.usersToken.splice(index, 1)
        });
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersToken.find((token) => 
            token.refresh_token === refresh_token
        )
        return userToken;
    }
}