import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItems1709600575139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'items',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: 'total',
                        type: 'decimal',
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('items')
    }

}
