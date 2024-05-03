/*
  Warnings:

  - Made the column `imgURL` on table `Song` required. This step will fail if there are existing NULL values in that column.

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
    "previewSpotifyURL" TEXT,
    "imgURL" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("createdAt", "id", "imgURL", "previewSpotifyURL", "singerName", "singerSpotifyURL", "songName", "songSpotifyId", "songSpotifyURL", "updatedAt", "userId") SELECT "createdAt", "id", "imgURL", "previewSpotifyURL", "singerName", "singerSpotifyURL", "songName", "songSpotifyId", "songSpotifyURL", "updatedAt", "userId" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
