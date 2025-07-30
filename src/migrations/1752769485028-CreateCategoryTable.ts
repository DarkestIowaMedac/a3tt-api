import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1752769485028 implements MigrationInterface {
    name = 'CreateCategoryTable1752769485028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "A3TT"."CATEGORY" (
                "ID" NUMBER(19,0) GENERATED ALWAYS AS IDENTITY
                    MINVALUE 1 MAXVALUE 9999999999999999999999999999
                    INCREMENT BY 1 START WITH 1 CACHE 20
                    NOORDER NOCYCLE NOKEEP NOSCALE NOT NULL ENABLE,
                "NAME" VARCHAR2(255 BYTE) NOT NULL ENABLE,
                "USER_ID" NUMBER(19,0) NOT NULL ENABLE,
                CONSTRAINT "CATEGORY_PK" PRIMARY KEY ("ID")
                    USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255
                    COMPUTE STATISTICS
                    TABLESPACE "USERS" ENABLE,
                CONSTRAINT "USER_ID" FOREIGN KEY ("USER_ID")
                    REFERENCES "A3TT"."USERS" ("ID")
                    ON DELETE CASCADE ENABLE
            ) SEGMENT CREATION DEFERRED
            PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255
            NOCOMPRESS LOGGING
            TABLESPACE "USERS"
        `);

        await queryRunner.query(`
            COMMENT ON TABLE "A3TT"."CATEGORY" IS 'Tabla de categorías del sistema'
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "A3TT"."CATEGORY"."ID" IS 'Clave primaria'
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "A3TT"."CATEGORY"."NAME" IS 'Nombre de la categoría'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "A3TT"."CATEGORY" CASCADE CONSTRAINTS`);
    }
}