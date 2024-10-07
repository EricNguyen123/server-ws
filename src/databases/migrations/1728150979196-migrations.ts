import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728150979196 implements MigrationInterface {
    name = 'Migrations1728150979196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin', 'editor') NOT NULL DEFAULT 'user', \`name\` varchar(255) NULL, \`zipcode\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`prefecture\` varchar(255) NULL, \`city\` varchar(255) NULL, \`street\` varchar(255) NULL, \`building\` varchar(255) NULL, \`encrypted_password\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '0', \`current_sign_in_at\` datetime NULL, \`last_sign_in_at\` datetime NULL, \`tokens\` varchar(255) NULL, \`provider\` varchar(255) NULL, \`uid\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shipping_companies\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`url\` varchar(255) NOT NULL, \`memo\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parentCategoryId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_ccde635bce518afe7c110858cc4\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_ccde635bce518afe7c110858cc4\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`shipping_companies\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
