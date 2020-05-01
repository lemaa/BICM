import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class userRole1588284354994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "role",
            type: "varchar"
        }));
        await queryRunner.dropColumn("users", "salt");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "salt",
            type: "varchar"
        }));
        await queryRunner.dropColumn("users", "role");
    }

}
