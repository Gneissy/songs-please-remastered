/*
  Warnings:

  - You are about to drop the column `imgURL` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `singer` on the `Song` table. All the data in the column will be lost.
  - Added the required column `previewSpotifyURL` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `singerName` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `singerSpotifyURL` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `songName` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `songSpotifyId` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `songSpotifyURL` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "singerName" TEXT NOT NULL,
    "singerSpotifyURL" TEXT NOT NULL,
    "songName" TEXT NOT NULL,
    "songSpotifyURL" TEXT NOT NULL,
    "songSpotifyId" TEXT NOT NULL,
    "previewSpotifyURL" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Song" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
