import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTreatments1626267200717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "treatments",
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
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "appointment_id",
                        type: "uuid"
                    },
                    {
                        name: "pet_id",
                        type: "uuid",
                    },
                    {
                        name: "remedie_id",
                        type: "uuid"
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now ()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now ()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKPetTreatment",
                        referencedTableName: "pets",
                        referencedColumnNames: ["id"],
                        columnNames:["pet_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKAppointmentTreatment",
                        referencedTableName: "appointments",
                        referencedColumnNames: ["id"],
                        columnNames:["appointment_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKRemedieTreatment",
                        referencedTableName: "remedies",
                        referencedColumnNames: ["id"],
                        columnNames:["remedie_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("treatments")
    }

}
