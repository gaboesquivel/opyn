

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."document_sections" (
    "id" bigint NOT NULL,
    "document_id" bigint NOT NULL,
    "content" "text" NOT NULL,
    "embedding" "extensions"."vector"(384)
);


ALTER TABLE "public"."document_sections" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."match_document_sections"("embedding" "extensions"."vector", "match_threshold" double precision) RETURNS SETOF "public"."document_sections"
    LANGUAGE "plpgsql"
    AS $$
#variable_conflict use_variable
begin
  return query
  select *
  from document_sections

  -- The inner product is negative, so we negate match_threshold
  where document_sections.embedding <#> embedding < -match_threshold

  -- Our embeddings are normalized to length 1, so cosine similarity
  -- and inner product will produce the same query results.
  -- Using inner product which can be computed faster.
  --
  -- For the different distance functions, see https://github.com/pgvector/pgvector
  order by document_sections.embedding <#> embedding;
end;
$$;


ALTER FUNCTION "public"."match_document_sections"("embedding" "extensions"."vector", "match_threshold" double precision) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."supabase_url"() RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  secret_value text;
begin
  select decrypted_secret into secret_value from vault.decrypted_secrets where name = 'supabase_url';
  return secret_value;
end;
$$;


ALTER FUNCTION "public"."supabase_url"() OWNER TO "postgres";


ALTER TABLE "public"."document_sections" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."document_sections_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."documents" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "storage_object_id" "uuid" NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."documents" OWNER TO "postgres";


ALTER TABLE "public"."documents" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."documents_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE OR REPLACE VIEW "public"."documents_with_storage_path" WITH ("security_invoker"='true') AS
 SELECT "documents"."id",
    "documents"."name",
    "documents"."storage_object_id",
    "documents"."created_by",
    "documents"."created_at",
    "objects"."name" AS "storage_object_path"
   FROM ("public"."documents"
     JOIN "storage"."objects" ON (("objects"."id" = "documents"."storage_object_id")));


ALTER TABLE "public"."documents_with_storage_path" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."market" (
    "id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "label" "text" NOT NULL,
    "base_asset" "uuid" NOT NULL,
    "quote_asset" "uuid" NOT NULL,
    "owner" "text" NOT NULL
);


ALTER TABLE "public"."market" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."token" (
    "address" "text" NOT NULL,
    "symbol" "text" NOT NULL,
    "chain_id" smallint NOT NULL,
    "decimals" smallint,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "uuid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."token" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user" (
    "address" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "ens" "text",
    "notifs" boolean,
    "telegram" "text"
);


ALTER TABLE "public"."user" OWNER TO "postgres";


ALTER TABLE ONLY "public"."document_sections"
    ADD CONSTRAINT "document_sections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "market_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "markets_label_key" UNIQUE ("label");



ALTER TABLE ONLY "public"."token"
    ADD CONSTRAINT "tokens_pkey" PRIMARY KEY ("address", "symbol", "chain_id");



ALTER TABLE ONLY "public"."token"
    ADD CONSTRAINT "tokens_uuid_key" UNIQUE ("uuid");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("address");



CREATE INDEX "document_sections_embedding_idx" ON "public"."document_sections" USING "hnsw" ("embedding" "extensions"."vector_ip_ops");



CREATE OR REPLACE TRIGGER "embed" AFTER INSERT ON "public"."document_sections" FOR EACH ROW EXECUTE FUNCTION "supabase_functions"."http_request"('https://iyzpghlzpofnklzeeiws.supabase.co/functions/v1/embed', 'POST', '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5enBnaGx6cG9mbmtsemVlaXdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODA1ODU0MCwiZXhwIjoyMDQzNjM0NTQwfQ.l1nCylAJdTaheaPwAC23sOZ1z5nXJNkqbJZjF8VcKeo"}', '{}', '1000');



CREATE OR REPLACE TRIGGER "embed_document_sections" AFTER INSERT ON "public"."document_sections" REFERENCING NEW TABLE AS "inserted" FOR EACH STATEMENT EXECUTE FUNCTION "private"."embed"('content', 'embedding');



ALTER TABLE ONLY "public"."document_sections"
    ADD CONSTRAINT "document_sections_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_storage_object_id_fkey" FOREIGN KEY ("storage_object_id") REFERENCES "storage"."objects"("id");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "markets_base_asset_fkey" FOREIGN KEY ("base_asset") REFERENCES "public"."token"("uuid");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "markets_quote_asset_fkey" FOREIGN KEY ("quote_asset") REFERENCES "public"."token"("uuid");



CREATE POLICY "Users can insert document sections" ON "public"."document_sections" FOR INSERT TO "authenticated" WITH CHECK (("document_id" IN ( SELECT "documents"."id"
   FROM "public"."documents"
  WHERE ("documents"."created_by" = "auth"."uid"()))));



CREATE POLICY "Users can insert documents" ON "public"."documents" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "created_by"));



CREATE POLICY "Users can query their own document sections" ON "public"."document_sections" FOR SELECT TO "authenticated" USING (("document_id" IN ( SELECT "documents"."id"
   FROM "public"."documents"
  WHERE ("documents"."created_by" = "auth"."uid"()))));



CREATE POLICY "Users can query their own documents" ON "public"."documents" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "created_by"));



CREATE POLICY "Users can update their own document sections" ON "public"."document_sections" FOR UPDATE TO "authenticated" USING (("document_id" IN ( SELECT "documents"."id"
   FROM "public"."documents"
  WHERE ("documents"."created_by" = "auth"."uid"())))) WITH CHECK (("document_id" IN ( SELECT "documents"."id"
   FROM "public"."documents"
  WHERE ("documents"."created_by" = "auth"."uid"()))));



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON TABLE "public"."document_sections" TO "anon";
GRANT ALL ON TABLE "public"."document_sections" TO "authenticated";
GRANT ALL ON TABLE "public"."document_sections" TO "service_role";



GRANT ALL ON FUNCTION "public"."match_document_sections"("embedding" "extensions"."vector", "match_threshold" double precision) TO "anon";
GRANT ALL ON FUNCTION "public"."match_document_sections"("embedding" "extensions"."vector", "match_threshold" double precision) TO "authenticated";
GRANT ALL ON FUNCTION "public"."match_document_sections"("embedding" "extensions"."vector", "match_threshold" double precision) TO "service_role";



GRANT ALL ON FUNCTION "public"."supabase_url"() TO "anon";
GRANT ALL ON FUNCTION "public"."supabase_url"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."supabase_url"() TO "service_role";



GRANT ALL ON SEQUENCE "public"."document_sections_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."document_sections_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."document_sections_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."documents" TO "anon";
GRANT ALL ON TABLE "public"."documents" TO "authenticated";
GRANT ALL ON TABLE "public"."documents" TO "service_role";



GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."documents_with_storage_path" TO "anon";
GRANT ALL ON TABLE "public"."documents_with_storage_path" TO "authenticated";
GRANT ALL ON TABLE "public"."documents_with_storage_path" TO "service_role";



GRANT ALL ON TABLE "public"."market" TO "anon";
GRANT ALL ON TABLE "public"."market" TO "authenticated";
GRANT ALL ON TABLE "public"."market" TO "service_role";



GRANT ALL ON TABLE "public"."token" TO "anon";
GRANT ALL ON TABLE "public"."token" TO "authenticated";
GRANT ALL ON TABLE "public"."token" TO "service_role";



GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






RESET ALL;
