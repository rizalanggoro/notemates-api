/*
  Warnings:

  - The primary key for the `LikeNote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idAuthor` on the `Note` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_idAuthor_fkey";

-- AlterTable
ALTER TABLE "LikeNote" DROP CONSTRAINT "LikeNote_pkey",
ADD CONSTRAINT "LikeNote_pkey" PRIMARY KEY ("idUser", "idNote");

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "idAuthor",
ADD COLUMN     "idUser" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
