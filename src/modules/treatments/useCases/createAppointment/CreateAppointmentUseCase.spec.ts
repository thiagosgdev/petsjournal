import { response } from "express";
import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { PetsRepositoryInMemory } from "modules/pets/repositories/inMemory/PetsRepositoryInMemory";
import { CreatePetUseCase } from "modules/pets/useCases/createPet/CreatePetUseCase";
import { AppointmentsRepositoryInMemory } from "modules/treatments/repositories/inMemory/AppointmentsRepositoryInMemory";
import { UsersRepositoryInMemory } from "modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "modules/users/useCases/createUsers/CreateUserUseCase";
import { DayjsDateProvider } from "shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "shared/errors/AppError";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";


let createAppointmentUseCase: CreateAppointmentUseCase;
let createUserUseCase: CreateUserUseCase;
let createPetUseCase: CreatePetUseCase;

let appointmentsRepositoryInMemory: AppointmentsRepositoryInMemory;
let petsRepositoryInMemory: PetsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let dateProvider: DayjsDateProvider;

let pet: Pet;

describe("Create Appointment",  () => {
    beforeEach(async () => {
        dateProvider  = new DayjsDateProvider;
        appointmentsRepositoryInMemory = new AppointmentsRepositoryInMemory;
        petsRepositoryInMemory = new PetsRepositoryInMemory;        
        usersRepositoryInMemory = new UsersRepositoryInMemory;
        createAppointmentUseCase = new CreateAppointmentUseCase(appointmentsRepositoryInMemory, dateProvider, petsRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        createPetUseCase = new CreatePetUseCase(petsRepositoryInMemory, usersRepositoryInMemory);

        const species:any = "cat" ;
        const gender: any = "female"

        await createUserUseCase.execute({
           name: "User test",
           email: "test@email.com",
           password: "test"
       });        

       const user = await usersRepositoryInMemory.findByEmail("test@email.com");
       
       pet = await createPetUseCase.execute({
           name: "Pet Test",
           species,
           gender,
           breed: "SRD",
           color: "Test",
           weight: 5,        
           birthdate: new Date(),
           chip_number: "123123",
           chip_website:"test;com.br",
           user_id: user.id
    });
});

    it("Should be able to Create a new Appointment", async () => {
       
        const data = {
            name: "Appointment test",
            description: "Description Test",
            date: new Date(),
            pet_id: pet.id
        };
        const appointment = await createAppointmentUseCase.execute({
            name: data.name,
            description: data.description,
            date: data.date,
            pet_id: data.pet_id
        });

        expect(appointment).toHaveProperty("id")
    });

    it("Should NOT create an Appointment if the Pet ID doesn't exists", async () => {
        const data = {
            name: "Appointment test",
            description: "Description Test",
            date: new Date(),
            pet_id: pet.id
        };

        expect(async () => {
            await createAppointmentUseCase.execute({
                name: data.name,
                description: data.description,
                date: data.date,
                pet_id: "NON EXISTING PET ID"
            });
        }).rejects.toEqual(new AppError("Pet doesn't exists!"));        
    })
});