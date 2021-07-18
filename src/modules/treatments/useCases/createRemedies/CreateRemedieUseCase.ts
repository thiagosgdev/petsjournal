import { ICreateRemediesDTO } from "modules/treatments/dtos/ICreateRemediesDTO";
import { Remedie } from "modules/treatments/infra/typeorm/entities/Remedie";
import { IRemediesRepository } from "modules/treatments/repositories/IRemediesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateRemedieUseCase {
    constructor(
        @inject("RemediesRepository")
        private remediesRepository: IRemediesRepository,
    ){}

    async execute({name, description, expires_date}:ICreateRemediesDTO):Promise<Remedie>
    {
        const remedie = await  this.remediesRepository.create({
            name,
            description,
            expires_date
        })

        return remedie;
    }
}