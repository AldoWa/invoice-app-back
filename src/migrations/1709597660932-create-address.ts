import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddress1709597660932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'address',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'street',
                        type: 'varchar',
                        length: '150',
                        isNullable: true,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        length: '150',
                        isNullable: true,
                    },
                    {
                        name: 'post_code',
                        type: 'varchar',
                        length: '150',
                        isNullable: true,
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        length: '150',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('address')
    }
}
