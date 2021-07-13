import { container } from "tsyringe"
import { ProfilePetUseCase } from "./ProfilePetUseCase";
import {Request, Response } from "express";

export class ProfilePetController {
    async handle (request: Request, response: Response): Promise<Response> {
        const {chip_number} = request.params;

        const profilePetsUseCase = container.resolve(ProfilePetUseCase);

        const pet = await profilePetsUseCase.execute(chip_number);

        return response.status(200).json(pet);
    }
}