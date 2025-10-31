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

 Date: 31/10/2025 21:32:37
*/


-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS "public"."banner";
CREATE TABLE "public"."banner" (
  "id" uuid NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "banner_image" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO "public"."banner" VALUES ('aa9088af-8400-4b11-bf67-0a7ea9eb84c6', 'coba', 'tes', 'tes', '2025-10-30 20:33:02+07');
INSERT INTO "public"."banner" VALUES ('38b6cfe0-3661-4017-acd6-91806dcc36f4', 'coba2', 'tes2', 'tes2', '2025-10-30 20:34:28+07');

-- ----------------------------
-- Primary Key structure for table banner
-- ----------------------------
ALTER TABLE "public"."banner" ADD CONSTRAINT "banner_pkey" PRIMARY KEY ("id");
