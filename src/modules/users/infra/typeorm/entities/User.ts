import { Pet } from "modules/pets/infra/typeorm/entities/Pet";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Pet, pet => pet.user)
    pets: Pet[];

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    token: string

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

export { User };