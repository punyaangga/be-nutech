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

 Date: 31/10/2025 21:32:17
*/


-- ----------------------------
-- Table structure for balance
-- ----------------------------
DROP TABLE IF EXISTS "public"."balance";
CREATE TABLE "public"."balance" (
  "id" uuid NOT NULL,
  "user_id" uuid,
  "user_balance" float8,
  "updated_at" timestamptz(6),
  "created_at" timestamptz(6)
)
;

-- ----------------------------
-- Primary Key structure for table balance
-- ----------------------------
ALTER TABLE "public"."balance" ADD CONSTRAINT "balance_pkey" PRIMARY KEY ("id");
