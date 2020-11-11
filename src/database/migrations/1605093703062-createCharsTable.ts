import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCharsTable1605093703062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "chars",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "energy",
                    type: "integer"
                },
                {
                    name: "knowledge",
                    type: "integer"
                },
                {
                    name: "popularity",
                    type: "integer"
                },
                {
                    name: "level",
                    type: "integer"
                },
                {
                    name: "user_id",
                    type: "integer"
                }
            ],
            foreignKeys: [
                {
                    name: "CharUser",
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('chars');
    }

}
