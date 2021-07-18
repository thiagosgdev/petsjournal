import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4 } from "uuid";
import { Treatment } from "./Treatment";

@Entity("appointments")
export class Appointment {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @ManyToOne(() => Pet, pet => pet.appointment)
    @JoinColumn({name: "pet_id"})
    pet: Pet;

    @Column()
    pet_id: string;

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