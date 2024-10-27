import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728998901351 implements MigrationInterface {
    name = 'Migrations1728998901351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`campaigns\` (\`id\` varchar(36) NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`campaign_type\` int NOT NULL, \`bought_count\` int NOT NULL, \`promotion_count\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`campaign_products\` (\`id\` varchar(36) NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`discount_value\` int NOT NULL, \`product_type\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`campaignId\` varchar(36) NULL, \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`campaign_products\` ADD CONSTRAINT \`FK_2cc5383c964b1dee2fc9f2745d8\` FOREIGN KEY (\`campaignId\`) REFERENCES \`campaigns\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`campaign_products\` ADD CONSTRAINT \`FK_a904ec9711e7ca646a5ce7d48f3\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign_products\` DROP FOREIGN KEY \`FK_a904ec9711e7ca646a5ce7d48f3\``);
        await queryRunner.query(`ALTER TABLE \`campaign_products\` DROP FOREIGN KEY \`FK_2cc5383c964b1dee2fc9f2745d8\``);
        await queryRunner.query(`DROP TABLE \`campaign_products\``);
        await queryRunner.query(`DROP TABLE \`campaigns\``);
    }

}
