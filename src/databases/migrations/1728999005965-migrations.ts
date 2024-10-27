import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728999005965 implements MigrationInterface {
    name = 'Migrations1728999005965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign_products\` DROP COLUMN \`end_date\``);
        await queryRunner.query(`ALTER TABLE \`campaign_products\` DROP COLUMN \`start_date\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign_products\` ADD \`start_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`campaign_products\` ADD \`end_date\` datetime NOT NULL`);
    }

}
