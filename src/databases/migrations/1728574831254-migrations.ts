import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728574831254 implements MigrationInterface {
    name = 'Migrations1728574831254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_ccde635bce518afe7c110858cc4\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`parentCategoryId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`parentCategoryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`categoryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_ccde635bce518afe7c110858cc4\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_c9594c262e6781893a1068d91be\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_40b29caafc0bbdf6d98a3ad2e41\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_40b29caafc0bbdf6d98a3ad2e41\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_c9594c262e6781893a1068d91be\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_ccde635bce518afe7c110858cc4\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`parentCategoryId\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`parentCategoryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_ccde635bce518afe7c110858cc4\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
