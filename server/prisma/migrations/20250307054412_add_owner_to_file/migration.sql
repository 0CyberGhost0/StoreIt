/*
  Warnings:

  - Added the required column `owner` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "owner" TEXT NOT NULL;
