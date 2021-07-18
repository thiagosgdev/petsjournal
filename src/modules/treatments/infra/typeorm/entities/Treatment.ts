import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Appointment } from "./Appointment";

@Entity("treatments")
export class Treatment {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    appointment_id: string;

    @ManyToOne(() => Pet, pet => pet.treatment)
    @JoinColumn({name: "pet_id"})
    pet: Pet

    @Column()
    pet_id:string

    @Column()
    start_date: Date

    @Column()
    end_date: Date;

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