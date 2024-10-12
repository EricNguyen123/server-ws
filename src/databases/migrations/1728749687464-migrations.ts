import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728749687464 implements MigrationInterface {
    name = 'Migrations1728749687464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` DROP FOREIGN KEY \`FK_079952e696964ef79a48278e150\``);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` DROP FOREIGN KEY \`FK_4f87551020bf812caef19badcdc\``);
        await queryRunner.query(`ALTER TABLE \`media_items\` DROP FOREIGN KEY \`FK_e0a637a949ef1f6bab139974d7b\``);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` ADD CONSTRAINT \`FK_4f87551020bf812caef19badcdc\` FOREIGN KEY (\`activeStorageBlobId\`) REFERENCES \`active_storage_blobs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` ADD CONSTRAINT \`FK_079952e696964ef79a48278e150\` FOREIGN KEY (\`mediaItemId\`) REFERENCES \`media_items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`media_items\` ADD CONSTRAINT \`FK_e0a637a949ef1f6bab139974d7b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media_items\` DROP FOREIGN KEY \`FK_e0a637a949ef1f6bab139974d7b\``);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` DROP FOREIGN KEY \`FK_079952e696964ef79a48278e150\``);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` DROP FOREIGN KEY \`FK_4f87551020bf812caef19badcdc\``);
        await queryRunner.query(`ALTER TABLE \`media_items\` ADD CONSTRAINT \`FK_e0a637a949ef1f6bab139974d7b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` ADD CONSTRAINT \`FK_4f87551020bf812caef19badcdc\` FOREIGN KEY (\`activeStorageBlobId\`) REFERENCES \`active_storage_blobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`active_storage_attachments\` ADD CONSTRAINT \`FK_079952e696964ef79a48278e150\` FOREIGN KEY (\`mediaItemId\`) REFERENCES \`media_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
