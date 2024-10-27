import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729104509815 implements MigrationInterface {
    name = 'Migrations1729104509815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_types\` CHANGE \`quantity\` \`quantity\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` CHANGE \`quantity\` \`quantity\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_resources\` CHANGE \`quantity\` \`quantity\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`quantity\` \`quantity\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`quantity_alert\` \`quantity_alert\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` CHANGE \`quantity\` \`quantity\` int UNSIGNED NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` CHANGE \`quantity\` \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`quantity_alert\` \`quantity_alert\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`quantity\` \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_resources\` CHANGE \`quantity\` \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` CHANGE \`quantity\` \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_types\` CHANGE \`quantity\` \`quantity\` int NOT NULL`);
    }

}
