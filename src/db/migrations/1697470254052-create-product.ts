import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1697470254052 implements MigrationInterface {
    name = 'CreateProduct1697470254052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "productId" uuid, CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_b367708bf720c8dd62fc6833161" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_b367708bf720c8dd62fc6833161"`);
        await queryRunner.query(`DROP TABLE "product_images"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
