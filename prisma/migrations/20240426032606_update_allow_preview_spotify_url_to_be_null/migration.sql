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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Song" ("createdAt", "id", "previewSpotifyURL", "singerName", "singerSpotifyURL", "songName", "songSpotifyId", "songSpotifyURL", "updatedAt") SELECT "createdAt", "id", "previewSpotifyURL", "singerName", "singerSpotifyURL", "songName", "songSpotifyId", "songSpotifyURL", "updatedAt" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
