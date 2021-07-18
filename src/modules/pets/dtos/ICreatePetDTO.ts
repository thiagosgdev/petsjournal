
enum PetSpecies{
    CAT = 'CAT',
    DOG = 'DOG',
    BIRD = 'BIRD',
    FISH = 'FISH'
};

enum PetGender{
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

interface ICreatePetDTO {
    name:string;
    species: PetSpecies;
    gender: PetGender;
    color: string;
    breed: string;
    weight: number;
    birthdate: Date;
    chip_number: string;
    chip_website: string;
    user_id: string;
    id?: string;
}

export { ICreatePetDTO, PetGender, PetSpecies }