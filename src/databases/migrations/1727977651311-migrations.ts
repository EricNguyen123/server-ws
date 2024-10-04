import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1727977651311 implements MigrationInterface {
    name = 'Migrations1727977651311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`role\` int NOT NULL DEFAULT '0', \`name\` varchar(255) NULL, \`zipcode\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`prefecture\` varchar(255) NULL, \`city\` varchar(255) NULL, \`street\` varchar(255) NULL, \`building\` varchar(255) NULL, \`encrypted_password\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '0', \`current_sign_in_at\` datetime NULL, \`last_sign_in_at\` datetime NULL, \`tokens\` varchar(255) NULL, \`provider\` varchar(255) NULL, \`uid\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
