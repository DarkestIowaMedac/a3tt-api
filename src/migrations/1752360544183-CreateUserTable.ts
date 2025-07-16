import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1752360544183 implements MigrationInterface {
    name = 'CreateUserTable1752360544183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE USERS (
                ID NUMBER GENERATED ALWAYS AS IDENTITY,
                NAME VARCHAR2(30) NOT NULL,
                EMAIL VARCHAR2(255) NOT NULL UNIQUE,
                PASSWORD VARCHAR2(255) NOT NULL,
                CONSTRAINT PK_USERS PRIMARY KEY (ID)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE USERS`);
    }
    //TODO Configurar la lista de comandos que sigue en el archivo commandMigrations
}
