import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729759922506 implements MigrationInterface {
    name = 'Migrations1729759922506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shipping_notices\` (\`id\` varchar(36) NOT NULL, \`document_number\` varchar(255) NOT NULL, \`subject\` text NOT NULL, \`content\` text NOT NULL, \`memo\` text NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shippingCompanyId\` varchar(36) NULL, \`orderItemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shipping_maker_managers\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`shippingInstructionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shipping_instructions\` (\`id\` varchar(36) NOT NULL, \`shipping_department\` int NOT NULL, \`shipping_source\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`subject\` text NOT NULL, \`content\` text NOT NULL, \`memo\` text NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderItemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`order_status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`order_status\` enum ('0', '1', '2') NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`shipping_status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`shipping_status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`shipping_notices\` ADD CONSTRAINT \`FK_2dfae72a6ba6e15b07b43439ac3\` FOREIGN KEY (\`shippingCompanyId\`) REFERENCES \`shipping_companies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_notices\` ADD CONSTRAINT \`FK_28df98dd352b0c2040ab3ff1131\` FOREIGN KEY (\`orderItemId\`) REFERENCES \`order_items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_maker_managers\` ADD CONSTRAINT \`FK_7d19f5a0f354852b4208edb2bc7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_maker_managers\` ADD CONSTRAINT \`FK_7523acc77bd43d31d5dc06cb0f5\` FOREIGN KEY (\`shippingInstructionId\`) REFERENCES \`shipping_instructions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_instructions\` ADD CONSTRAINT \`FK_370802cace0dd71f29f26b77d0f\` FOREIGN KEY (\`orderItemId\`) REFERENCES \`order_items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_instructions\` DROP FOREIGN KEY \`FK_370802cace0dd71f29f26b77d0f\``);
        await queryRunner.query(`ALTER TABLE \`shipping_maker_managers\` DROP FOREIGN KEY \`FK_7523acc77bd43d31d5dc06cb0f5\``);
        await queryRunner.query(`ALTER TABLE \`shipping_maker_managers\` DROP FOREIGN KEY \`FK_7d19f5a0f354852b4208edb2bc7\``);
        await queryRunner.query(`ALTER TABLE \`shipping_notices\` DROP FOREIGN KEY \`FK_28df98dd352b0c2040ab3ff1131\``);
        await queryRunner.query(`ALTER TABLE \`shipping_notices\` DROP FOREIGN KEY \`FK_2dfae72a6ba6e15b07b43439ac3\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`shipping_status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`shipping_status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`order_status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`order_status\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`shipping_instructions\``);
        await queryRunner.query(`DROP TABLE \`shipping_maker_managers\``);
        await queryRunner.query(`DROP TABLE \`shipping_notices\``);
    }

}
