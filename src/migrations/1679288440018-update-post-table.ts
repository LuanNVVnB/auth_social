import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1679288440018 implements MigrationInterface {
    name = 'updatePostTable1679288440018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_detail\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`photo\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`userName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(255) NOT NULL, \`userDetailId\` varchar(36) NULL, UNIQUE INDEX \`REL_c515f2c59bd83b80cf07846a96\` (\`userDetailId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`social\` (\`id\` varchar(36) NOT NULL, \`socialName\` varchar(255) NOT NULL, \`idSocial\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c515f2c59bd83b80cf07846a968\` FOREIGN KEY (\`userDetailId\`) REFERENCES \`user_detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`social\` ADD CONSTRAINT \`FK_4cda297c26dea7a3b8d08b9ba18\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`social\` DROP FOREIGN KEY \`FK_4cda297c26dea7a3b8d08b9ba18\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c515f2c59bd83b80cf07846a968\``);
        await queryRunner.query(`DROP TABLE \`social\``);
        await queryRunner.query(`DROP INDEX \`REL_c515f2c59bd83b80cf07846a96\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`user_detail\``);
    }

}
