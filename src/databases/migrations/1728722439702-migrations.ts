import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728722439702 implements MigrationInterface {
    name = 'Migrations1728722439702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`stores\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`postcode\` varchar(8) NOT NULL, \`prefecture\` varchar(255) NULL, \`city\` varchar(255) NULL, \`street\` varchar(255) NULL, \`building\` varchar(255) NULL, \`status\` enum ('1', '0') NOT NULL DEFAULT '0', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` enum ('1', '0') NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE \`stores\``);
    }

}
