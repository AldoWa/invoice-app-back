import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInvoice1709846755921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'invoice',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true,
                            isNullable: false,
                        },
                        {
                            name: 'description',
                            type: 'varchar',
                            length: '150',
                            isNullable: true,
                        },
                        {
                            name: 'client_name',
                            type: 'varchar',
                            length: '150',
                            isNullable: true,
                        },
                        {
                            name: 'client_email',
                            type: 'varchar',
                            length: '150',
                            isNullable: true,
                        },
                        {
                            name: 'status',
                            type: 'enum',
                            isNullable: true,
                            enum: ['draft', 'pending', 'paid']
                        },
                        {
                            name: 'sender_address_id',
                            type: 'uuid',
                            isNullable: true,
                        },
                        {
                            name: 'client_address_id',
                            type: 'uuid',
                            isNullable: true,
                        },
                        {
                            name: 'items_id',
                            type: 'uuid',
                            isNullable: true,
                        },
                        {
                            name: 'total',
                            type: 'decimal',
                            scale: 2,
                            isNullable: true,
                        },
                        {
                            name: 'paymentDue',
                            type: 'timestamp',
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
                            name: 'fk_invoice_send_address',
                            columnNames: ['sender_address_id'],
                            referencedTableName: 'address',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        },
                        {
                            name: 'fk_invoice_client_address',
                            columnNames: ['client_address_id'],
                            referencedTableName: 'address',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        },
                        {
                            name: 'fk_invoice_items',
                            columnNames: ['items_id'],
                            referencedTableName: 'items',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        },
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('invoice')
    }
}
