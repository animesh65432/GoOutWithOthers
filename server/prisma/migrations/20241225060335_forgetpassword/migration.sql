-- CreateTable
CREATE TABLE "ForgerPassword" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ForgerPassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ForgerPassword" ADD CONSTRAINT "ForgerPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
