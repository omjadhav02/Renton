-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "country" TEXT,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "postCode" INTEGER,
ADD COLUMN     "state" TEXT;
