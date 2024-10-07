import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728319962121 implements MigrationInterface {
    name = 'Migrations1728319962121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`active_storage_blobs\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`key\` varchar(255) NOT NULL, \`filename\` varchar(255) NOT NULL, \`content_type\` varchar(255) NOT NULL, \`metadata\` text NOT NULL, \`byte_size\` int NOT NULL, \`checksum\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`active_storage_attachments\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`record_type\` varchar(255) NOT NULL, \`activeStorageBlobId\` varchar(36) NULL, \`mediaItemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`media_items\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`resource_type\` varchar(255) NOT NULL, \`media_type\` int NOT NULL, \`media_url\` text NOT NULL, \`resource_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`shipping_companies\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`shipping_companies\` ADD \`phone\` varchar(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`shipping_companies\` DROP COLUMN \`memo\``);
        await queryRunner.query(`ALTER TABLE \`shipping_companies\` ADD \`memo\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`zipcode\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`zipcode\` varchar(8) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`tokens\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`tokens\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`discount\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`banners\` DROP COLUMN \`descriptions\``);
        await queryRunner.query(`ALTER TABLE \`banners\` ADD \`descriptions\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` ADD CONSTRAINT \`FK_4f87551020bf812caef19badcdc\` FOREIGN KEY (\`activeStorageBlobId\`) REFERENCES \`active_storage_blobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` ADD CONSTRAINT \`FK_079952e696964ef79a48278e150\` FOREIGN KEY (\`mediaItemId\`) REFERENCES \`media_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`media_items\` ADD CONSTRAINT \`FK_82d540b08e64a06bf40ece3dd1d\` FOREIGN KEY (\`resource_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media_items\` DROP FOREIGN KEY \`FK_82d540b08e64a06bf40ece3dd1d\``);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` DROP FOREIGN KEY \`FK_079952e696964ef79a48278e150\``);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` DROP FOREIGN KEY \`FK_4f87551020bf812caef19badcdc\``);
        await queryRunner.query(`ALTER TABLE \`banners\` DROP COLUMN \`descriptions\``);
        await queryRunner.query(`ALTER TABLE \`banners\` ADD \`descriptions\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`discount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`tokens\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`tokens\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`zipcode\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`zipcode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`shipping_companies\` DROP COLUMN \`memo\``);
        await queryRunner.query(`ALTER TABLE \`shipping_companies\` ADD \`memo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`shipping_companies\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`shipping_companies\` ADD \`phone\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`media_items\``);
        await queryRunner.query(`DROP TABLE \`active_storage_attachments\``);
        await queryRunner.query(`DROP TABLE \`active_storage_blobs\``);
    }

}
