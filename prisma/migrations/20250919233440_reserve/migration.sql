/*
  Warnings:

  - Added the required column `room_id` to the `Reserve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reserve" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dateInit" TEXT NOT NULL,
    "dateEnd" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    CONSTRAINT "Reserve_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserve_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reserve" ("dateEnd", "dateInit", "id", "name") SELECT "dateEnd", "dateInit", "id", "name" FROM "Reserve";
DROP TABLE "Reserve";
ALTER TABLE "new_Reserve" RENAME TO "Reserve";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
