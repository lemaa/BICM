import {MigrationInterface, QueryRunner} from "typeorm";

export class createInitDb1585838071193 implements MigrationInterface {
    name = 'createInitDb1585838071193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicules" ("id" SERIAL NOT NULL, "marque" character varying, "model" character varying, "color" character varying, "pictures" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "PK_ba3a47ea8be2150ea0533653b26" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" integer NOT NULL, "birthdate" date NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "zip_code" integer NOT NULL, "country" character varying NOT NULL, "picture" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" integer NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "zip_code" integer NOT NULL, "country" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "UQ_e53ef0697f9d5d933fa075be1c3" UNIQUE ("phone"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" integer NOT NULL, "age" integer NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "zip_code" integer NOT NULL, "country" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "UQ_aa22377d7d3e794ae4cd39cd9e5" UNIQUE ("phone"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "notification" boolean NOT NULL DEFAULT true, "theme" boolean NOT NULL DEFAULT true, "sound" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_9175e059b0a720536f7726a88c" UNIQUE ("userId"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "clients_compagnies_company" ("clientsId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_17f74fad142785086dce410c29d" PRIMARY KEY ("clientsId", "companyId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_20e5e39007280698ba4dd91432" ON "clients_compagnies_company" ("clientsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3847b94d5186cc14704bd68073" ON "clients_compagnies_company" ("companyId") `, undefined);
        await queryRunner.query(`ALTER TABLE "vehicules" ADD CONSTRAINT "FK_a6d5f96868e1450700c6dc29325" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6f9395c9037632a31107c8a9e58" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "settings" ADD CONSTRAINT "FK_9175e059b0a720536f7726a88c7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "clients_compagnies_company" ADD CONSTRAINT "FK_20e5e39007280698ba4dd914327" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "clients_compagnies_company" ADD CONSTRAINT "FK_3847b94d5186cc14704bd680737" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients_compagnies_company" DROP CONSTRAINT "FK_3847b94d5186cc14704bd680737"`, undefined);
        await queryRunner.query(`ALTER TABLE "clients_compagnies_company" DROP CONSTRAINT "FK_20e5e39007280698ba4dd914327"`, undefined);
        await queryRunner.query(`ALTER TABLE "settings" DROP CONSTRAINT "FK_9175e059b0a720536f7726a88c7"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6f9395c9037632a31107c8a9e58"`, undefined);
        await queryRunner.query(`ALTER TABLE "vehicules" DROP CONSTRAINT "FK_a6d5f96868e1450700c6dc29325"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_3847b94d5186cc14704bd68073"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_20e5e39007280698ba4dd91432"`, undefined);
        await queryRunner.query(`DROP TABLE "clients_compagnies_company"`, undefined);
        await queryRunner.query(`DROP TABLE "settings"`, undefined);
        await queryRunner.query(`DROP TABLE "clients"`, undefined);
        await queryRunner.query(`DROP TABLE "company"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "vehicules"`, undefined);
    }

}
