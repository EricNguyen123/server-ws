import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729178523522 implements MigrationInterface {
    name = 'Migrations1729178523522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bill_logs\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`billId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_items\` (\`id\` varchar(36) NOT NULL, \`price\` int NOT NULL, \`status\` int NOT NULL, \`shipping_date\` datetime NOT NULL, \`order_type\` int NOT NULL, \`quantity\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderId\` varchar(36) NULL, \`cartItemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`orderer_type\` varchar(255) NOT NULL, \`receiver_type\` varchar(255) NOT NULL, \`order_status\` int NOT NULL, \`shipping_status\` int NOT NULL, \`order_id\` varchar(255) NOT NULL, \`order_date\` datetime NOT NULL, \`order_at\` datetime NOT NULL, \`memo\` text NOT NULL, \`order_type\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`billId\` varchar(36) NULL, \`userId\` varchar(36) NULL, \`orderer_id\` varchar(36) NULL, \`receiver_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bills\` (\`id\` varchar(36) NOT NULL, \`status\` int NOT NULL, \`export_at\` datetime NOT NULL, \`bill_id\` varchar(255) NOT NULL, \`reduced_taxable_amount\` int NOT NULL, \`reduced_tax\` int NOT NULL, \`taxable_amount\` int NOT NULL, \`tax\` int NOT NULL, \`shipping_fee\` int NOT NULL, \`amount\` int NOT NULL, \`discount\` int NOT NULL, \`total_amount\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bill_items\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`order_id\` varchar(255) NOT NULL, \`order_at\` datetime NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`billGroupId\` varchar(36) NULL, \`productTypeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bill_groups\` (\`id\` varchar(36) NOT NULL, \`reduced_taxable_amount\` int NOT NULL, \`reduced_tax\` int NOT NULL, \`taxable_amount\` int NOT NULL, \`tax\` int NOT NULL, \`shipping_fee\` int NOT NULL, \`amount\` int NOT NULL, \`discount\` int NOT NULL, \`total_amount\` int NOT NULL, \`order_type\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`billId\` varchar(36) NULL, \`storeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bill_logs\` ADD CONSTRAINT \`FK_bf786e850d59e88b9af828c3a3d\` FOREIGN KEY (\`billId\`) REFERENCES \`bills\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_f1d359a55923bb45b057fbdab0d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_fe9000dbac97fbd6ea8e49abaae\` FOREIGN KEY (\`cartItemId\`) REFERENCES \`cart_items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_1d654486f624b7805632a3585a3\` FOREIGN KEY (\`billId\`) REFERENCES \`bills\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_4f25ce83588f6f4fe87fdd5b8ea\` FOREIGN KEY (\`orderer_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_2ba91092da6555355583985a5d5\` FOREIGN KEY (\`receiver_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bill_items\` ADD CONSTRAINT \`FK_616323b8209c2a8dcd580dc6997\` FOREIGN KEY (\`billGroupId\`) REFERENCES \`bill_groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bill_items\` ADD CONSTRAINT \`FK_5ffb12f501a26ca77aba2bbc018\` FOREIGN KEY (\`productTypeId\`) REFERENCES \`product_types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bill_groups\` ADD CONSTRAINT \`FK_ea12003830b5d4984a7447ac017\` FOREIGN KEY (\`billId\`) REFERENCES \`bills\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bill_groups\` ADD CONSTRAINT \`FK_0ba023c6e037a87903a16db29f7\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bill_groups\` DROP FOREIGN KEY \`FK_0ba023c6e037a87903a16db29f7\``);
        await queryRunner.query(`ALTER TABLE \`bill_groups\` DROP FOREIGN KEY \`FK_ea12003830b5d4984a7447ac017\``);
        await queryRunner.query(`ALTER TABLE \`bill_items\` DROP FOREIGN KEY \`FK_5ffb12f501a26ca77aba2bbc018\``);
        await queryRunner.query(`ALTER TABLE \`bill_items\` DROP FOREIGN KEY \`FK_616323b8209c2a8dcd580dc6997\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_2ba91092da6555355583985a5d5\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_4f25ce83588f6f4fe87fdd5b8ea\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_1d654486f624b7805632a3585a3\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_fe9000dbac97fbd6ea8e49abaae\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_f1d359a55923bb45b057fbdab0d\``);
        await queryRunner.query(`ALTER TABLE \`bill_logs\` DROP FOREIGN KEY \`FK_bf786e850d59e88b9af828c3a3d\``);
        await queryRunner.query(`DROP TABLE \`bill_groups\``);
        await queryRunner.query(`DROP TABLE \`bill_items\``);
        await queryRunner.query(`DROP TABLE \`bills\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`order_items\``);
        await queryRunner.query(`DROP TABLE \`bill_logs\``);
    }

}
