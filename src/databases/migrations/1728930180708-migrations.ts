import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728930180708 implements MigrationInterface {
    name = 'Migrations1728930180708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`prefectures\` DROP FOREIGN KEY \`FK_1278c051710dc0fd7405fb84b58\``);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` DROP FOREIGN KEY \`FK_19773ec3ea547c496dc31fc01be\``);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` DROP FOREIGN KEY \`FK_b4dfaac3b0c598b50a235a921f7\``);
        await queryRunner.query(`ALTER TABLE \`prefectures\` ADD CONSTRAINT \`FK_1278c051710dc0fd7405fb84b58\` FOREIGN KEY (\`shippingSettingId\`) REFERENCES \`shipping_settings\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` ADD CONSTRAINT \`FK_19773ec3ea547c496dc31fc01be\` FOREIGN KEY (\`prefectureId\`) REFERENCES \`prefectures\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` ADD CONSTRAINT \`FK_b4dfaac3b0c598b50a235a921f7\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` DROP FOREIGN KEY \`FK_b4dfaac3b0c598b50a235a921f7\``);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` DROP FOREIGN KEY \`FK_19773ec3ea547c496dc31fc01be\``);
        await queryRunner.query(`ALTER TABLE \`prefectures\` DROP FOREIGN KEY \`FK_1278c051710dc0fd7405fb84b58\``);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` ADD CONSTRAINT \`FK_b4dfaac3b0c598b50a235a921f7\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` ADD CONSTRAINT \`FK_19773ec3ea547c496dc31fc01be\` FOREIGN KEY (\`prefectureId\`) REFERENCES \`prefectures\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`prefectures\` ADD CONSTRAINT \`FK_1278c051710dc0fd7405fb84b58\` FOREIGN KEY (\`shippingSettingId\`) REFERENCES \`shipping_settings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
