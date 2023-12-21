-- CreateEnum
CREATE TYPE "View" AS ENUM ('board', 'list', 'timeline', 'calendar');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "view" "View" NOT NULL DEFAULT 'board';
