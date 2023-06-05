BEGIN;
--
-- Alter field justificativa on alternativa
--
CREATE TABLE "new__ifsolve_alternativa" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "justificativa" text NULL, "texto" text NOT NULL);
INSERT INTO "new__ifsolve_alternativa" ("id", "texto", "justificativa") SELECT "id", "texto", "justificativa" FROM "ifsolve_alternativa";
DROP TABLE "ifsolve_alternativa";
ALTER TABLE "new__ifsolve_alternativa" RENAME TO "ifsolve_alternativa";
--
-- Alter field texto on alternativa
--
CREATE TABLE "new__ifsolve_alternativa" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "justificativa" text NULL, "texto" text NULL);
INSERT INTO "new__ifsolve_alternativa" ("id", "justificativa", "texto") SELECT "id", "justificativa", "texto" FROM "ifsolve_alternativa";
DROP TABLE "ifsolve_alternativa";
ALTER TABLE "new__ifsolve_alternativa" RENAME TO "ifsolve_alternativa";
COMMIT;
