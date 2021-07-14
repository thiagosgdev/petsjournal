import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1626267175470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
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
                        name: "date",
                        type: "timestamp"
                    },
                    {
                        name: "pet_id",
                        type: "uuid",
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
                        name: "FKPetAppointment",
                        referencedTableName: "pets",
                        referencedColumnNames: ["id"],
                        columnNames:["pet_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments")
    }

}
