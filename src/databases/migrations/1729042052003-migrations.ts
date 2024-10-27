import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729042052003 implements MigrationInterface {
    name = 'Migrations1729042052003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`color_types\` (\`id\` varchar(36) NOT NULL, \`color_code\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`size_types\` (\`id\` varchar(36) NOT NULL, \`size_code\` varchar(255) NOT NULL, \`size_type\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_type_resources\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productTypeId\` varchar(36) NULL, \`producResourceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_types\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` varchar(36) NULL, \`colorTypeId\` varchar(36) NULL, \`sizeTypeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`productTypeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` ADD CONSTRAINT \`FK_bbe2266f76a5aed6bba06b54235\` FOREIGN KEY (\`productTypeId\`) REFERENCES \`product_types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` ADD CONSTRAINT \`FK_3006f57a666ee7bac165c5270b4\` FOREIGN KEY (\`producResourceId\`) REFERENCES \`product_resources\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_types\` ADD CONSTRAINT \`FK_6ee30c7f441b25c115652193272\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_types\` ADD CONSTRAINT \`FK_39e2fed2bc5efe7beaf9a9151fe\` FOREIGN KEY (\`colorTypeId\`) REFERENCES \`color_types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_types\` ADD CONSTRAINT \`FK_19e269f7a131480ac723b266473\` FOREIGN KEY (\`sizeTypeId\`) REFERENCES \`size_types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_2fa1c1dfa09da5fcca155d97d65\` FOREIGN KEY (\`productTypeId\`) REFERENCES \`product_types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_2fa1c1dfa09da5fcca155d97d65\``);
        await queryRunner.query(`ALTER TABLE \`product_types\` DROP FOREIGN KEY \`FK_19e269f7a131480ac723b266473\``);
        await queryRunner.query(`ALTER TABLE \`product_types\` DROP FOREIGN KEY \`FK_39e2fed2bc5efe7beaf9a9151fe\``);
        await queryRunner.query(`ALTER TABLE \`product_types\` DROP FOREIGN KEY \`FK_6ee30c7f441b25c115652193272\``);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` DROP FOREIGN KEY \`FK_3006f57a666ee7bac165c5270b4\``);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` DROP FOREIGN KEY \`FK_bbe2266f76a5aed6bba06b54235\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`productTypeId\``);
        await queryRunner.query(`DROP TABLE \`product_types\``);
        await queryRunner.query(`DROP TABLE \`product_type_resources\``);
        await queryRunner.query(`DROP TABLE \`size_types\``);
        await queryRunner.query(`DROP TABLE \`color_types\``);
    }

}
