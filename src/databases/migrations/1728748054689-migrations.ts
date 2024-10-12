import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728748054689 implements MigrationInterface {
    name = 'Migrations1728748054689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin', 'editor') NOT NULL DEFAULT 'user', \`name\` varchar(255) NULL, \`zipcode\` varchar(8) NULL, \`phone\` varchar(12) NULL, \`prefecture\` varchar(255) NULL, \`city\` varchar(255) NULL, \`street\` varchar(255) NULL, \`building\` varchar(255) NULL, \`encrypted_password\` varchar(255) NOT NULL, \`status\` enum ('1', '0') NOT NULL DEFAULT '0', \`current_sign_in_at\` datetime NULL, \`last_sign_in_at\` datetime NULL, \`tokens\` text NULL, \`provider\` varchar(255) NULL, \`uid\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shipping_companies\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`phone\` varchar(12) NULL, \`url\` varchar(255) NOT NULL, \`memo\` text NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`active_storage_blobs\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`key\` varchar(255) NOT NULL, \`filename\` varchar(255) NOT NULL, \`content_type\` varchar(255) NOT NULL, \`metadata\` text NOT NULL, \`byte_size\` int NOT NULL, \`checksum\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`active_storage_attachments\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`record_type\` varchar(255) NOT NULL, \`activeStorageBlobId\` varchar(36) NULL, \`mediaItemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banners\` (\`id\` varchar(36) NOT NULL, \`descriptions\` text NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`number_order\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`media_items\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`resource_type\` varchar(255) NOT NULL, \`media_type\` int NOT NULL, \`media_url\` text NOT NULL, \`productId\` varchar(36) NULL, \`bannerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parentCategoryId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_tinies\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` varchar(36) NULL, \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`discount_settings\` (\`id\` varchar(36) NOT NULL, \`custom_discount_value\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`quantity\` int NOT NULL, \`quantity_alert\` int NOT NULL, \`order_unit\` int NOT NULL, \`description\` text NOT NULL, \`status\` int NOT NULL, \`multiplication_rate\` int NOT NULL, \`discount\` float NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_resources\` (\`id\` varchar(36) NOT NULL, \`resource_type\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` varchar(36) NULL, \`resource_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stores\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`postcode\` varchar(8) NOT NULL, \`prefecture\` varchar(255) NULL, \`city\` varchar(255) NULL, \`street\` varchar(255) NULL, \`building\` varchar(255) NULL, \`status\` enum ('1', '0') NOT NULL DEFAULT '0', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` ADD CONSTRAINT \`FK_4f87551020bf812caef19badcdc\` FOREIGN KEY (\`activeStorageBlobId\`) REFERENCES \`active_storage_blobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` ADD CONSTRAINT \`FK_079952e696964ef79a48278e150\` FOREIGN KEY (\`mediaItemId\`) REFERENCES \`media_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`media_items\` ADD CONSTRAINT \`FK_e0a637a949ef1f6bab139974d7b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`media_items\` ADD CONSTRAINT \`FK_ab328a62eec13540c806ba6190e\` FOREIGN KEY (\`bannerId\`) REFERENCES \`banners\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_ccde635bce518afe7c110858cc4\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_tinies\` ADD CONSTRAINT \`FK_9a21884881ffb067ef43dd3019b\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_tinies\` ADD CONSTRAINT \`FK_f01dc09539d0ae2d9773fc50051\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount_settings\` ADD CONSTRAINT \`FK_2f119da8fa60c7c8aad79126368\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_resources\` ADD CONSTRAINT \`FK_89ea7a42e47e3a2936410c5fc81\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_resources\` ADD CONSTRAINT \`FK_9021bef1a81a04bbac06815ca6a\` FOREIGN KEY (\`resource_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_resources\` DROP FOREIGN KEY \`FK_9021bef1a81a04bbac06815ca6a\``);
        await queryRunner.query(`ALTER TABLE \`product_resources\` DROP FOREIGN KEY \`FK_89ea7a42e47e3a2936410c5fc81\``);
        await queryRunner.query(`ALTER TABLE \`discount_settings\` DROP FOREIGN KEY \`FK_2f119da8fa60c7c8aad79126368\``);
        await queryRunner.query(`ALTER TABLE \`category_tinies\` DROP FOREIGN KEY \`FK_f01dc09539d0ae2d9773fc50051\``);
        await queryRunner.query(`ALTER TABLE \`category_tinies\` DROP FOREIGN KEY \`FK_9a21884881ffb067ef43dd3019b\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_ccde635bce518afe7c110858cc4\``);
        await queryRunner.query(`ALTER TABLE \`media_items\` DROP FOREIGN KEY \`FK_ab328a62eec13540c806ba6190e\``);
        await queryRunner.query(`ALTER TABLE \`media_items\` DROP FOREIGN KEY \`FK_e0a637a949ef1f6bab139974d7b\``);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` DROP FOREIGN KEY \`FK_079952e696964ef79a48278e150\``);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` DROP FOREIGN KEY \`FK_4f87551020bf812caef19badcdc\``);
        await queryRunner.query(`DROP TABLE \`stores\``);
        await queryRunner.query(`DROP TABLE \`product_resources\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`discount_settings\``);
        await queryRunner.query(`DROP TABLE \`category_tinies\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`media_items\``);
        await queryRunner.query(`DROP TABLE \`banners\``);
        await queryRunner.query(`DROP TABLE \`active_storage_attachments\``);
        await queryRunner.query(`DROP TABLE \`active_storage_blobs\``);
        await queryRunner.query(`DROP TABLE \`shipping_companies\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
