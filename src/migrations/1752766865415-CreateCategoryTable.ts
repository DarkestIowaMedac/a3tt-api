import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1752766865415 implements MigrationInterface {
    name = 'CreateCategoryTable1752766865415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CATEGORY" DROP CONSTRAINT "USER_ID"`);
        await queryRunner.query(`ALTER TABLE "USERS" MODIFY "ID" number  `);
        await queryRunner.query(`ALTER TABLE "USERS" DROP COLUMN "NAME"`);
        await queryRunner.query(`ALTER TABLE "USERS" ADD "NAME" varchar2(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "CATEGORY" MODIFY "ID" number  `);
        await queryRunner.query(`ALTER TABLE "CATEGORY" MODIFY "USER_ID" number  NULL`);
        await queryRunner.query(`ALTER TABLE "CATEGORY" ADD CONSTRAINT "FK_95036f93879ac7b2cee37c1ec23" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("ID") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CATEGORY" DROP CONSTRAINT "FK_95036f93879ac7b2cee37c1ec23"`);
        await queryRunner.query(`ALTER TABLE "CATEGORY" MODIFY "USER_ID" number(19,0)  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "CATEGORY" MODIFY "ID" number(19,0)  `);
        await queryRunner.query(`ALTER TABLE "USERS" DROP COLUMN "NAME"`);
        await queryRunner.query(`ALTER TABLE "USERS" ADD "NAME" varchar2(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USERS" MODIFY "ID" number(19,0)  `);
        await queryRunner.query(`ALTER TABLE "CATEGORY" ADD CONSTRAINT "USER_ID" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("ID")`);
    }

}
