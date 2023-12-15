BEGIN;

DROP TABLE IF EXISTS "list", "card", "tag", "card_has_tag";

CREATE TABLE "list" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "position" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL DEFAULT '',
  "color" TEXT NOT NULL DEFAULT '#f6f7f9' ,
  "list_id" INTEGER NOT NULL REFERENCES list("id") ON DELETE CASCADE,
  "position" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tag" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "color" TEXT NOT NULL DEFAULT '#149ECA' ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_tag" (
  "card_id" INTEGER NOT NULL REFERENCES card("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES tag("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO "list" ("name", "position")
VALUES ('To do', 1);

INSERT INTO "list" ("name", "position")
VALUES ('In progress', 2);

INSERT INTO "list" ("name", "position")
VALUES ('Done', 3);

COMMIT;