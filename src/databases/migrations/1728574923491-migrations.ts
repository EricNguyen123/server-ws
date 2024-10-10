import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728574923491 implements MigrationInterface {
    name = 'Migrations1728574923491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_40b29caafc0bbdf6d98a3ad2e41\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_c9594c262e6781893a1068d91be\``);
        await queryRunner.query(`CREATE TABLE \`category_tinies\` (\`id\` varchar(36) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` varchar(36) NULL, \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`category_tinies\` ADD CONSTRAINT \`FK_9a21884881ffb067ef43dd3019b\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_tinies\` ADD CONSTRAINT \`FK_f01dc09539d0ae2d9773fc50051\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_tinies\` DROP FOREIGN KEY \`FK_f01dc09539d0ae2d9773fc50051\``);
        await queryRunner.query(`ALTER TABLE \`category_tinies\` DROP FOREIGN KEY \`FK_9a21884881ffb067ef43dd3019b\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`categoryId\` varchar(36) NULL`);
        await queryRunner.query(`DROP TABLE \`category_tinies\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_c9594c262e6781893a1068d91be\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_40b29caafc0bbdf6d98a3ad2e41\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
