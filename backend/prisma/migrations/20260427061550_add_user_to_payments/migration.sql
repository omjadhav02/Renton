-- Backfill userId from booking's tenantId before making it NOT NULL

ALTER TABLE "Payment" ADD COLUMN "userId" TEXT;

UPDATE "Payment" p
SET "userId" = b."tenantId"
FROM "Booking" b
WHERE p."bookingId" = b.id;

ALTER TABLE "Payment" ALTER COLUMN "userId" SET NOT NULL;

ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;