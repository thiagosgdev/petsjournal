import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity("treatments")
export class Treatment {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Appointment, appointment => appointment.treatment)
    appointment: Appointment

    @ManyToOne(() => Pet, pet => pet.treatment)
    @JoinColumn({name: "pet_id"})
    pet: Pet

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}