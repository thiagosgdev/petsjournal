import { UsersRepositoryInMemory } from "modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "modules/users/repositories/inMemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "shared/errors/AppError";
import { CreateUserUseCase } from "../createUsers/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory;
        usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory;
        dateProvider = new DayjsDateProvider;
        authenticateUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    });

    it("Should be able to authenticate an User", async () => {
        const email = "test@email.com";
        const password = "1234";

        await createUserUseCase.execute({
            name: "User test",
            email: "test@email.com",
            password: "1234"
        });

        const tokenCreated = await authenticateUseCase.execute(email, password);

        expect(tokenCreated).toHaveProperty("token");
    });
    it("Should NOT be able to authenticate a user that doesn't exists", async ( ) => {
        const email = "null@null.com";
        const password = "null";
        await expect( async () =>{
            await authenticateUseCase.execute(
                email,
                password,
            )
        }
        ).rejects.toEqual(new AppError("Email or password incorrect!"))
    });
    it("Should NOT be able to authenticate a user with email/password NOT matching", async ( ) => {
        const email = "wrong@wwrong.com";
        const password = "wrong";

        await createUserUseCase.execute({
            name: "User test",
            email: "test@email.com",
            password: "1234"
        });
        await expect( async () =>{
            await authenticateUseCase.execute(
                email,
                password,
            )
        }
        ).rejects.toEqual(new AppError("Email or password incorrect!"))
    });
});