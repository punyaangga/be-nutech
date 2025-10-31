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

 Date: 31/10/2025 21:33:07
*/


-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_info";
CREATE TABLE "public"."user_info" (
  "id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "first_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "last_name" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) NOT NULL,
  "photo_profile" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Primary Key structure for table user_info
-- ----------------------------
ALTER TABLE "public"."user_info" ADD CONSTRAINT "user_info_pkey" PRIMARY KEY ("id");
