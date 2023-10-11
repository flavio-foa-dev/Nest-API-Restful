import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1697054737004 implements MigrationInterface {
  name = 'CreateUserTable1697054737004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "main_image" boolean NOT NULL, "productId" uuid, CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_characteristics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "productId" uuid, CONSTRAINT "PK_070b55fb83575ccca7fbdac7fc4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "salt" character varying(255) NOT NULL, "confirmation_token" character varying(64), "recover_token" character varying(64), "role" character varying(20) NOT NULL, "status" character varying NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_category_product_categories" ("productsId" uuid NOT NULL, "productCategoriesId" uuid NOT NULL, CONSTRAINT "PK_1188b2894953aaa829e9f085920" PRIMARY KEY ("productsId", "productCategoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_03df097ddd84318410f44110b1" ON "products_category_product_categories" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa392e6dedd5291b7ff3ba1f9a" ON "products_category_product_categories" ("productCategoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images" ADD CONSTRAINT "FK_b367708bf720c8dd62fc6833161" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristics" ADD CONSTRAINT "FK_d3944bc62d589d4c834e83f2245" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_category_product_categories" ADD CONSTRAINT "FK_03df097ddd84318410f44110b17" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_category_product_categories" ADD CONSTRAINT "FK_fa392e6dedd5291b7ff3ba1f9a4" FOREIGN KEY ("productCategoriesId") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_category_product_categories" DROP CONSTRAINT "FK_fa392e6dedd5291b7ff3ba1f9a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_category_product_categories" DROP CONSTRAINT "FK_03df097ddd84318410f44110b17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristics" DROP CONSTRAINT "FK_d3944bc62d589d4c834e83f2245"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images" DROP CONSTRAINT "FK_b367708bf720c8dd62fc6833161"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fa392e6dedd5291b7ff3ba1f9a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_03df097ddd84318410f44110b1"`,
    );
    await queryRunner.query(
      `DROP TABLE "products_category_product_categories"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "product_categories"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "product_characteristics"`);
    await queryRunner.query(`DROP TABLE "product_images"`);
  }
}
