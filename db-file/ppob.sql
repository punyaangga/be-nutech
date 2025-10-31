/*
 Navicat Premium Dump SQL

 Source Server         : Local PGSQL
 Source Server Type    : PostgreSQL
 Source Server Version : 140013 (140013)
 Source Host           : localhost:5432
 Source Catalog        : nutech
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140013 (140013)
 File Encoding         : 65001

 Date: 31/10/2025 21:32:44
*/


-- ----------------------------
-- Table structure for ppob
-- ----------------------------
DROP TABLE IF EXISTS "public"."ppob";
CREATE TABLE "public"."ppob" (
  "id" uuid NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "ppob_icon" text COLLATE "pg_catalog"."default",
  "cost" float8 NOT NULL,
  "created_at" timestamptz(6) NOT NULL,
  "description" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of ppob
-- ----------------------------
INSERT INTO "public"."ppob" VALUES ('c9002d2c-c6d2-45bf-8e7e-8c250278ee62', 'Pulsa', 'PULSA', 'www.google.com', 5000, '2025-10-31 06:50:41+07', 'Pulsa gratis');
INSERT INTO "public"."ppob" VALUES ('3d674e11-75c8-46fd-aaaf-50925cc36c18', 'PLN', 'PLN', 'www.google.com', 2000, '2025-10-31 06:51:04+07', 'PLN Pasca bayar');

-- ----------------------------
-- Primary Key structure for table ppob
-- ----------------------------
ALTER TABLE "public"."ppob" ADD CONSTRAINT "ppob_pkey" PRIMARY KEY ("id");
