import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1752919015934 implements MigrationInterface {
    name = 'CreateTaskTable1752919015934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "A3TT"."TASK" (
                "ID" NUMBER(19,0) GENERATED ALWAYS AS IDENTITY
                    MINVALUE 1 MAXVALUE 9999999999999999999999999999
                    INCREMENT BY 1 START WITH 1 CACHE 20
                    NOORDER NOCYCLE NOKEEP NOSCALE NOT NULL ENABLE,
                "NAME" VARCHAR2(255 BYTE) DEFAULT 'Inserta Nombre',
                "DESCRIPTION" VARCHAR2(4000 BYTE) DEFAULT 'Inserta Descripcion',
                "STATE" NUMBER(1,0) DEFAULT 0 NOT NULL ENABLE,
                "USER_ID" NUMBER(19,0) NOT NULL ENABLE,
                "CATEGORY_ID" NUMBER(19,0),
                CONSTRAINT "TASK_PK" PRIMARY KEY ("ID")
                    USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255
                    COMPUTE STATISTICS
                    TABLESPACE "USERS" ENABLE,
                CONSTRAINT "CATEGORY_FK" FOREIGN KEY ("CATEGORY_ID")
                    REFERENCES "A3TT"."CATEGORY" ("ID")
                    ON DELETE CASCADE ENABLE,
                CONSTRAINT "USERS_FK" FOREIGN KEY ("USER_ID")
                    REFERENCES "A3TT"."USERS" ("ID")
                    ON DELETE CASCADE ENABLE
            ) SEGMENT CREATION DEFERRED
            PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255
            NOCOMPRESS LOGGING
            TABLESPACE "USERS"
        `);

        await queryRunner.query(`
            COMMENT ON COLUMN "A3TT"."TASK"."ID" IS 'Clave primaria'
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "A3TT"."TASK"."STATE" IS '0 -> pendiente, 1 -> completada'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "A3TT"."TASK" CASCADE CONSTRAINTS`);
    }
}