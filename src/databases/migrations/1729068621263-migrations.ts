import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729068621263 implements MigrationInterface {
    name = 'Migrations1729068621263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` DROP FOREIGN KEY \`FK_3006f57a666ee7bac165c5270b4\``);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` CHANGE \`producResourceId\` \`productResourceId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` ADD CONSTRAINT \`FK_4f44d8a714206a362a645fd70d5\` FOREIGN KEY (\`productResourceId\`) REFERENCES \`product_resources\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` DROP FOREIGN KEY \`FK_4f44d8a714206a362a645fd70d5\``);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` CHANGE \`productResourceId\` \`producResourceId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_type_resources\` ADD CONSTRAINT \`FK_3006f57a666ee7bac165c5270b4\` FOREIGN KEY (\`producResourceId\`) REFERENCES \`product_resources\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
