import { PetsRepository } from "modules/pets/infra/typeorm/repositories/PetsRepository";
import { IPetsRepository } from "modules/pets/repositories/IPetsRepository";
import { AppointmentsRepository } from "modules/treatments/infra/typeorm/repositories/AppointmentsRepository";
import { RemediesRepository } from "modules/treatments/infra/typeorm/repositories/RemediesRepository";
import { TreatmentsRepository } from "modules/treatments/infra/typeorm/repositories/TreatmentsRepository";
import { IAppointmentsRepository } from "modules/treatments/repositories/IAppointmentsRepository";
import { IRemediesRepository } from "modules/treatments/repositories/IRemediesRepository";
import { ITreatmentsRepository } from "modules/treatments/repositories/ITreatmentsRepository";
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
);

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    
    DayjsDateProvider
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",

    UsersTokensRepository
);


container.registerSingleton<IAppointmentsRepository>(
    "AppointmentsRepository",

    AppointmentsRepository
);

container.registerSingleton<ITreatmentsRepository>(
    "TreatmentsRepository",

    TreatmentsRepository
);

container.registerSingleton<IRemediesRepository>(
    "RemediesRepository",
    
    RemediesRepository
);


