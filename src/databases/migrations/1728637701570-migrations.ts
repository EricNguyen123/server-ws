import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728637701570 implements MigrationInterface {
    name = 'Migrations1728637701570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discount_settings\` (\`id\` varchar(36) NOT NULL, \`custom_discount_value\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`discount_settings\` ADD CONSTRAINT \`FK_2f119da8fa60c7c8aad79126368\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount_settings\` DROP FOREIGN KEY \`FK_2f119da8fa60c7c8aad79126368\``);
        await queryRunner.query(`DROP TABLE \`discount_settings\``);
    }

}
