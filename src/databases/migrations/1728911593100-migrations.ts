import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728911593100 implements MigrationInterface {
    name = 'Migrations1728911593100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`store_prefectures\` (\`id\` varchar(36) NOT NULL, \`shipping_fee\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`prefectureId\` varchar(36) NULL, \`storeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`prefectures\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`postcode\` varchar(255) NOT NULL, \`shipping_fee\` int NOT NULL, \`kind\` int NOT NULL, \`label\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shippingSettingId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shipping_settings\` (\`id\` varchar(36) NOT NULL, \`free_ship_amount\` int NOT NULL, \`free_ship_number\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` ADD CONSTRAINT \`FK_19773ec3ea547c496dc31fc01be\` FOREIGN KEY (\`prefectureId\`) REFERENCES \`prefectures\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` ADD CONSTRAINT \`FK_b4dfaac3b0c598b50a235a921f7\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`prefectures\` ADD CONSTRAINT \`FK_1278c051710dc0fd7405fb84b58\` FOREIGN KEY (\`shippingSettingId\`) REFERENCES \`shipping_settings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`prefectures\` DROP FOREIGN KEY \`FK_1278c051710dc0fd7405fb84b58\``);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` DROP FOREIGN KEY \`FK_b4dfaac3b0c598b50a235a921f7\``);
        await queryRunner.query(`ALTER TABLE \`store_prefectures\` DROP FOREIGN KEY \`FK_19773ec3ea547c496dc31fc01be\``);
        await queryRunner.query(`DROP TABLE \`shipping_settings\``);
        await queryRunner.query(`DROP TABLE \`prefectures\``);
        await queryRunner.query(`DROP TABLE \`store_prefectures\``);
    }

}
