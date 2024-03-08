import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItems1709858309801 implements MigrationInterface {

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
                        name: 'invoice_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: "150",
                        isNullable: true,
                        isUnique: true,
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
                foreignKeys: [
                    {
                        name: 'fk_items_invoice',
                        referencedTableName: 'invoices',
                        referencedColumnNames: ['id'],
                        columnNames: ['invoice_id'],
                    }
                ]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('items')
    }

}