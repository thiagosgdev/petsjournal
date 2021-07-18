
import { Appointment } from "modules/treatments/infra/typeorm/entities/Appointment";
import { Treatment } from "modules/treatments/infra/typeorm/entities/Treatment";
import { User } from "modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";


enum PetSpecies {
    CAT = 'CAT',
    DOG = 'DOG',
    BIRD = 'BIRD',
    FISH = 'FISH'
};

enum PetGender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

@Entity("pets")
class Pet {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({type: 'enum', enum: PetSpecies})
    species: PetSpecies;

    @Column({type: 'enum', enum: PetGender})
    gender: PetGender;

    @Column()
    breed: string;
    
    @Column()
    weight: number;

    @Column()
    color: string;

    @Column()
    chip_number: string;


    @Column()
    chip_website: string;

    @Column()
    birthdate: Date;

    @Column()
    user_id: string;

    @OneToMany(() => Appointment, appointment => appointment.pet)
    appointment: Appointment;

    @OneToMany(() => Treatment, treatment => treatment.pet)
    treatment: Treatment;

    @ManyToOne(() => User, user => user.pets)   
    @JoinColumn({name: "user_id"})
    user: User;    

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { Pet };