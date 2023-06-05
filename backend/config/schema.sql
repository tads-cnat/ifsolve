BEGIN;
--
-- Create model Alternativa
--
CREATE TABLE "ifsolve_alternativa" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "texto" text NOT NULL, "justificativa" text NOT NULL);
--
-- Create model Area
--
CREATE TABLE "ifsolve_area" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "codigo" varchar(15) NOT NULL, "nome" varchar(50) NOT NULL, "descricao" text NOT NULL, "subarea_de_id" bigint NULL REFERENCES "ifsolve_area" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model Avaliacao
--
CREATE TABLE "ifsolve_avaliacao" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "titulo" varchar(100) NOT NULL, "descricao" text NOT NULL, "data_inicio" datetime NULL, "data_fim" datetime NULL, "nota" integer NOT NULL, "visibilidade" varchar(2) NOT NULL);
--
-- Create model Item
--
CREATE TABLE "ifsolve_item" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "tipo" varchar(2) NOT NULL, "visibilidade" varchar(2) NOT NULL, "assunto" varchar(50) NOT NULL, "titulo" varchar(50) NOT NULL, "data_publicacao" datetime NOT NULL, "texto_base" text NULL, "enunciado" text NOT NULL, "expectativa_resposta" text NULL, "alternativa_correta" varchar(1) NULL, "alternativa_a_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_b_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_c_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_d_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_e_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "area_id" bigint NULL REFERENCES "ifsolve_area" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model ItemAvaliacao
--
CREATE TABLE "ifsolve_itemavaliacao" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "numero_item" integer NOT NULL, "nota_item" integer NOT NULL, "avaliacao_id" bigint NOT NULL REFERENCES "ifsolve_avaliacao" ("id") DEFERRABLE INITIALLY DEFERRED, "item_id" bigint NOT NULL REFERENCES "ifsolve_item" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model Tag
--
CREATE TABLE "ifsolve_tag" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "nome" varchar(30) NOT NULL);
--
-- Create model Usuario
--
CREATE TABLE "ifsolve_usuario" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "data_nascimento" date NOT NULL, "user_id" integer NOT NULL UNIQUE REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model Aluno
--
CREATE TABLE "ifsolve_aluno" ("usuario_ptr_id" bigint NOT NULL PRIMARY KEY REFERENCES "ifsolve_usuario" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model Elaborador
--
CREATE TABLE "ifsolve_elaborador" ("usuario_ptr_id" bigint NOT NULL PRIMARY KEY REFERENCES "ifsolve_usuario" ("id") DEFERRABLE INITIALLY DEFERRED, "verificado" bool NOT NULL);
--
-- Add field tags to item
--
CREATE TABLE "new__ifsolve_item" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "tipo" varchar(2) NOT NULL, "visibilidade" varchar(2) NOT NULL, "assunto" varchar(50) NOT NULL, "titulo" varchar(50) NOT NULL, "data_publicacao" datetime NOT NULL, "texto_base" text NULL, "enunciado" text NOT NULL, "expectativa_resposta" text NULL, "alternativa_correta" varchar(1) NULL, "alternativa_a_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_b_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_c_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_d_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_e_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "area_id" bigint NULL REFERENCES "ifsolve_area" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "ifsolve_item_tags" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "item_id" bigint NOT NULL REFERENCES "ifsolve_item" ("id") DEFERRABLE INITIALLY DEFERRED, "tag_id" bigint NOT NULL REFERENCES "ifsolve_tag" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "new__ifsolve_item" ("id", "tipo", "visibilidade", "assunto", "titulo", "data_publicacao", "texto_base", "enunciado", "expectativa_resposta", "alternativa_correta", "alternativa_a_id", "alternativa_b_id", "alternativa_c_id", "alternativa_d_id", "alternativa_e_id", "area_id") SELECT "id", "tipo", "visibilidade", "assunto", "titulo", "data_publicacao", "texto_base", "enunciado", "expectativa_resposta", "alternativa_correta", "alternativa_a_id", "alternativa_b_id", "alternativa_c_id", "alternativa_d_id", "alternativa_e_id", "area_id" FROM "ifsolve_item";
DROP TABLE "ifsolve_item";
ALTER TABLE "new__ifsolve_item" RENAME TO "ifsolve_item";
CREATE INDEX "ifsolve_area_subarea_de_id_a2a1e80a" ON "ifsolve_area" ("subarea_de_id");
CREATE INDEX "ifsolve_itemavaliacao_avaliacao_id_62eec219" ON "ifsolve_itemavaliacao" ("avaliacao_id");
CREATE INDEX "ifsolve_itemavaliacao_item_id_fc585d8e" ON "ifsolve_itemavaliacao" ("item_id");
CREATE INDEX "ifsolve_item_area_id_b92f458b" ON "ifsolve_item" ("area_id");
CREATE UNIQUE INDEX "ifsolve_item_tags_item_id_tag_id_3b70927c_uniq" ON "ifsolve_item_tags" ("item_id", "tag_id");
CREATE INDEX "ifsolve_item_tags_item_id_37213b20" ON "ifsolve_item_tags" ("item_id");
CREATE INDEX "ifsolve_item_tags_tag_id_6f174e34" ON "ifsolve_item_tags" ("tag_id");
--
-- Create model Resposta
--
CREATE TABLE "ifsolve_resposta" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "resposta" text NOT NULL, "nota_obtida" integer NULL, "data_hora" datetime NOT NULL, "item_id" bigint NULL REFERENCES "ifsolve_item" ("id") DEFERRABLE INITIALLY DEFERRED, "item_avaliacao_id" bigint NULL REFERENCES "ifsolve_itemavaliacao" ("id") DEFERRABLE INITIALLY DEFERRED, "aluno_id" bigint NULL REFERENCES "ifsolve_aluno" ("usuario_ptr_id") DEFERRABLE INITIALLY DEFERRED);
--
-- Add field elaborador to item
--
CREATE TABLE "new__ifsolve_item" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "tipo" varchar(2) NOT NULL, "visibilidade" varchar(2) NOT NULL, "assunto" varchar(50) NOT NULL, "titulo" varchar(50) NOT NULL, "data_publicacao" datetime NOT NULL, "texto_base" text NULL, "enunciado" text NOT NULL, "expectativa_resposta" text NULL, "alternativa_correta" varchar(1) NULL, "alternativa_a_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_b_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_c_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_d_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "alternativa_e_id" bigint NULL UNIQUE REFERENCES "ifsolve_alternativa" ("id") DEFERRABLE INITIALLY DEFERRED, "area_id" bigint NULL REFERENCES "ifsolve_area" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "ifsolve_item_elaborador" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "item_id" bigint NOT NULL REFERENCES "ifsolve_item" ("id") DEFERRABLE INITIALLY DEFERRED, "elaborador_id" bigint NOT NULL REFERENCES "ifsolve_elaborador" ("usuario_ptr_id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "new__ifsolve_item" ("id", "tipo", "visibilidade", "assunto", "titulo", "data_publicacao", "texto_base", "enunciado", "expectativa_resposta", "alternativa_correta", "alternativa_a_id", "alternativa_b_id", "alternativa_c_id", "alternativa_d_id", "alternativa_e_id", "area_id") SELECT "id", "tipo", "visibilidade", "assunto", "titulo", "data_publicacao", "texto_base", "enunciado", "expectativa_resposta", "alternativa_correta", "alternativa_a_id", "alternativa_b_id", "alternativa_c_id", "alternativa_d_id", "alternativa_e_id", "area_id" FROM "ifsolve_item";
DROP TABLE "ifsolve_item";
ALTER TABLE "new__ifsolve_item" RENAME TO "ifsolve_item";
CREATE INDEX "ifsolve_resposta_item_id_368ec9cf" ON "ifsolve_resposta" ("item_id");
CREATE INDEX "ifsolve_resposta_item_avaliacao_id_53f7b909" ON "ifsolve_resposta" ("item_avaliacao_id");
CREATE INDEX "ifsolve_resposta_aluno_id_ec3991fa" ON "ifsolve_resposta" ("aluno_id");
CREATE INDEX "ifsolve_item_area_id_b92f458b" ON "ifsolve_item" ("area_id");
CREATE UNIQUE INDEX "ifsolve_item_elaborador_item_id_elaborador_id_debde9b4_uniq" ON "ifsolve_item_elaborador" ("item_id", "elaborador_id");
CREATE INDEX "ifsolve_item_elaborador_item_id_178a3741" ON "ifsolve_item_elaborador" ("item_id");
CREATE INDEX "ifsolve_item_elaborador_elaborador_id_045c8763" ON "ifsolve_item_elaborador" ("elaborador_id");
--
-- Add field alunos to avaliacao
--
CREATE TABLE "new__ifsolve_avaliacao" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "titulo" varchar(100) NOT NULL, "descricao" text NOT NULL, "data_inicio" datetime NULL, "data_fim" datetime NULL, "nota" integer NOT NULL, "visibilidade" varchar(2) NOT NULL);
CREATE TABLE "ifsolve_avaliacao_alunos" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "avaliacao_id" bigint NOT NULL REFERENCES "ifsolve_avaliacao" ("id") DEFERRABLE INITIALLY DEFERRED, "aluno_id" bigint NOT NULL REFERENCES "ifsolve_aluno" ("usuario_ptr_id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "new__ifsolve_avaliacao" ("id", "titulo", "descricao", "data_inicio", "data_fim", "nota", "visibilidade") SELECT "id", "titulo", "descricao", "data_inicio", "data_fim", "nota", "visibilidade" FROM "ifsolve_avaliacao";
DROP TABLE "ifsolve_avaliacao";
ALTER TABLE "new__ifsolve_avaliacao" RENAME TO "ifsolve_avaliacao";
CREATE UNIQUE INDEX "ifsolve_avaliacao_alunos_avaliacao_id_aluno_id_5efe5044_uniq" ON "ifsolve_avaliacao_alunos" ("avaliacao_id", "aluno_id");
CREATE INDEX "ifsolve_avaliacao_alunos_avaliacao_id_a5074981" ON "ifsolve_avaliacao_alunos" ("avaliacao_id");
CREATE INDEX "ifsolve_avaliacao_alunos_aluno_id_96d95d18" ON "ifsolve_avaliacao_alunos" ("aluno_id");
--
-- Add field elaborador to avaliacao
--
CREATE TABLE "new__ifsolve_avaliacao" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "titulo" varchar(100) NOT NULL, "descricao" text NOT NULL, "data_inicio" datetime NULL, "data_fim" datetime NULL, "nota" integer NOT NULL, "visibilidade" varchar(2) NOT NULL, "elaborador_id" bigint NOT NULL REFERENCES "ifsolve_elaborador" ("usuario_ptr_id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "new__ifsolve_avaliacao" ("id", "titulo", "descricao", "data_inicio", "data_fim", "nota", "visibilidade", "elaborador_id") SELECT "id", "titulo", "descricao", "data_inicio", "data_fim", "nota", "visibilidade", NULL FROM "ifsolve_avaliacao";
DROP TABLE "ifsolve_avaliacao";
ALTER TABLE "new__ifsolve_avaliacao" RENAME TO "ifsolve_avaliacao";
CREATE INDEX "ifsolve_avaliacao_elaborador_id_185112ff" ON "ifsolve_avaliacao" ("elaborador_id");
COMMIT;
