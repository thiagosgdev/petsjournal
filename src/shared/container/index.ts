import { PetsRepository } from "modules/pets/infra/typeorm/repositories/PetsRepository";
import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { UsersRepository } from "modules/users/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "modules/users/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "modules/users/repositories/IUsersTokensRepository";
import { container } from "tsyringe";
import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";


container.registerSingleton<IUsersRepository>(
    "UsersRepository",

    UsersRepository
);

container.registerSingleton<IPetsRepository>(
    "PetsRepository",

    PetsRepository
)

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    
    DayjsDateProvider
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",

    UsersTokensRepository
)