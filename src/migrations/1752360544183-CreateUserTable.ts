import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable implements MigrationInterface {
    name = 'CreateUserTable'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "A3TT"."USERS" (
                "ID" NUMBER(19,0) GENERATED ALWAYS AS IDENTITY
                    MINVALUE 1 MAXVALUE 9999999999999999999999999999
                    INCREMENT BY 1 START WITH 1 CACHE 20
                    NOORDER NOCYCLE NOKEEP NOSCALE NOT NULL ENABLE,
                "NAME" VARCHAR2(30 BYTE) NOT NULL ENABLE,
                "EMAIL" VARCHAR2(255 BYTE) NOT NULL ENABLE UNIQUE,
                "PASSWORD" VARCHAR2(255 BYTE) NOT NULL ENABLE,
                CONSTRAINT "USERS_PK" PRIMARY KEY ("ID")
                    USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255
                    COMPUTE STATISTICS
                    TABLESPACE "USERS" ENABLE
            ) SEGMENT CREATION IMMEDIATE
            PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255
            NOCOMPRESS LOGGING
            STORAGE(
                INITIAL 65536 NEXT 1048576
                MINEXTENTS 1 MAXEXTENTS 2147483645
                PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
                BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
            )
            TABLESPACE "USERS"
        `);

        await queryRunner.query(`
            COMMENT ON TABLE "A3TT"."USERS" IS 'Tabla de usuarios del sistema'
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "A3TT"."USERS"."ID" IS 'Clave primaria'
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "A3TT"."USERS"."NAME" IS 'UserTag'
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "A3TT"."USERS"."EMAIL" IS 'Email único del usuario'
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "A3TT"."USERS"."PASSWORD" IS 'Contraseña hasheada'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "A3TT"."USERS" CASCADE CONSTRAINTS`);
    }
}