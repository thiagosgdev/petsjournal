import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePets1624918353629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pets",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "species",
                        type: "varchar"
                    },
                    {
                        name: "color",
                        type: "varchar"
                    },
                    {
                        name: "breed",
                        type: "varchar",
                    },
                    {
                        name: "chip_number",
                        type: "varchar"
                    },
                    {
                        name: "chip_website",
                        type: "varchar",
                    },
                    {
                        name: "weight"  ,
                        type: "numeric"
                    },
                    {
                        name: "birthdate",
                        type: "timestamp",
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserPet",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pets");
    }

}
