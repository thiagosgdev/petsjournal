import { classToClass } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";


export class UserMap {
    static toDTO ({
        email,
        name, 
        id,
        token,
    }: User): IUserResponseDTO{
        const user = classToClass({
            email,
            name, 
            id,
            token,
        })
        return user;
    }
}