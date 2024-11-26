

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



CREATE TYPE "public"."oracle_type" AS ENUM (
    'CHAINLINK',
    'PYTH',
    'UNISWAP'
);


ALTER TYPE "public"."oracle_type" OWNER TO "postgres";


CREATE TYPE "public"."perp_type" AS ENUM (
    'zero_perp',
    'half_perp',
    'one_perp',
    'two_perp'
);


ALTER TYPE "public"."perp_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."aggregate_market_metrics"("sort_field" "text" DEFAULT 'total_liquidity'::"text", "sort_direction" "text" DEFAULT 'DESC'::"text", "page_limit" integer DEFAULT 10, "page_offset" integer DEFAULT 0) RETURNS TABLE("underlier_asset_symbol" "text", "underlier_asset_name" "text", "underlier_asset_image_url" "text", "num_markets" numeric, "total_liquidity" numeric, "total_volume_24h" numeric, "total_volume_7d" numeric, "total_volume_30d" numeric, "total_open_interest" numeric, "total_num_traders" numeric, "total_fees_collected" numeric)
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
  RETURN QUERY EXECUTE format(
    $f$
    SELECT
      a.symbol AS underlier_asset_symbol,
      a.name AS underlier_asset_name,
      a.image_url AS underlier_asset_image_url,
      COUNT(a.symbol)::NUMERIC AS num_markets,
      SUM(mm.liquidity) AS total_liquidity,
      SUM(mm.volume_24h) AS total_volume_24h,
      SUM(mm.volume_7d) AS total_volume_7d,
      SUM(mm.volume_30d) AS total_volume_30d,
      SUM(mm.open_interest) AS total_open_interest,
      SUM(mm.num_traders)::NUMERIC AS total_num_traders,
      SUM(mm.fees_collected) AS total_fees_collected
    FROM
      public.market_metric mm
      JOIN public.market m ON mm.market_id = m.id
      JOIN public.asset a ON m.underlier = a.uuid
    GROUP BY
      a.symbol, a.name, a.image_url
    ORDER BY
      %I %s
    LIMIT %L OFFSET %L
    $f$,
    sort_field, sort_direction, page_limit, page_offset
  );
END;
$_$;


ALTER FUNCTION "public"."aggregate_market_metrics"("sort_field" "text", "sort_direction" "text", "page_limit" integer, "page_offset" integer) OWNER TO "postgres";

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


CREATE TABLE IF NOT EXISTS "public"."asset" (
    "address" "text" NOT NULL,
    "symbol" "text" NOT NULL,
    "decimals" smallint DEFAULT '18'::smallint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "uuid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "stablecoin" boolean DEFAULT false NOT NULL,
    "image_url" "text"
);


ALTER TABLE "public"."asset" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."balance" (
    "address" "text" NOT NULL,
    "market_id" "text",
    "zero" bigint,
    "half" bigint,
    "one" bigint,
    "two" bigint
);


ALTER TABLE "public"."balance" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."chainlink_price_feed" (
    "id" integer NOT NULL,
    "asset" "text" NOT NULL,
    "numeraire" "text" NOT NULL,
    "feed" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "asset_uuid" "uuid",
    "numeraire_uuid" "uuid"
);


ALTER TABLE "public"."chainlink_price_feed" OWNER TO "postgres";


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
    "underlier" "uuid" NOT NULL,
    "numeraire" "uuid" NOT NULL,
    "deployer" "text" NOT NULL,
    "controller" "text" NOT NULL,
    "auction" "text" NOT NULL,
    "crab_world" "text" NOT NULL,
    "half_crab" "text" NOT NULL,
    "two_crab" "text" NOT NULL,
    "stable_flo" "text" NOT NULL,
    "asset_flo" "text" NOT NULL,
    "safetypool" "text",
    "shutdown" "text",
    "redemption" "text",
    "span_margin" "text",
    "oracle" "text",
    "oracle_type" "public"."oracle_type",
    "power_perp_factory" "text",
    "is_immutable" boolean DEFAULT false,
    "is_active" boolean DEFAULT true,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "2_perp_long" "text",
    "2_perp_short" "text"
);


ALTER TABLE "public"."market" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."market_collateral" (
    "id" integer NOT NULL,
    "market_id" "text" NOT NULL,
    "collateral_address" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."market_collateral" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."market_collateral_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."market_collateral_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."market_collateral_id_seq" OWNED BY "public"."market_collateral"."id";



CREATE TABLE IF NOT EXISTS "public"."market_metric" (
    "market_id" "text" NOT NULL,
    "liquidity" numeric DEFAULT 0 NOT NULL,
    "volume_24h" numeric DEFAULT 0 NOT NULL,
    "volume_7d" numeric DEFAULT 0 NOT NULL,
    "volume_30d" numeric DEFAULT 0 NOT NULL,
    "open_interest" numeric DEFAULT 0 NOT NULL,
    "num_traders" integer DEFAULT 0 NOT NULL,
    "fees_collected" numeric DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."market_metric" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."market_perp" (
    "id" integer NOT NULL,
    "market_id" "text" NOT NULL,
    "perp_type" "public"."perp_type" NOT NULL,
    "is_active" boolean DEFAULT true,
    "lower_carry" numeric NOT NULL,
    "upper_carry" numeric NOT NULL,
    "initial_carry" numeric NOT NULL,
    "liquidation_fee" numeric NOT NULL,
    "minting_fee" numeric NOT NULL,
    "funding_fee" numeric NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."market_perp" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."market_perp_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."market_perp_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."market_perp_id_seq" OWNED BY "public"."market_perp"."id";



CREATE TABLE IF NOT EXISTS "public"."portfolio_health" (
    "id" bigint NOT NULL,
    "market_id" "text" NOT NULL,
    "user_address" "text" NOT NULL,
    "health_score" numeric NOT NULL,
    "last_updated" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."portfolio_health" OWNER TO "postgres";


ALTER TABLE "public"."portfolio_health" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."portfolio_health_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."pyth_price_feed" (
    "id" integer NOT NULL,
    "asset" "text" NOT NULL,
    "numeraire" "text" NOT NULL,
    "price_id" "bytea" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "asset_uuid" "uuid",
    "numeraire_uuid" "uuid"
);


ALTER TABLE "public"."pyth_price_feed" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."temp_market_data" (
    "id" bigint NOT NULL,
    "market_id" "text" NOT NULL,
    "index_price" numeric NOT NULL,
    "mark_price" numeric NOT NULL,
    "change_24hr" numeric NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."temp_market_data" OWNER TO "postgres";


ALTER TABLE "public"."temp_market_data" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."temp_market_data_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."transactions" (
    "id" bigint NOT NULL,
    "transaction_hash" "text" NOT NULL,
    "from_address" "text" NOT NULL,
    "to_address" "text" NOT NULL,
    "token" "uuid" NOT NULL,
    "status" "text" NOT NULL,
    "usd_amount" numeric NOT NULL,
    "transaction_type" "text" NOT NULL,
    "market_id" "text" NOT NULL,
    "perp_id" bigint NOT NULL,
    "quantity_amount" numeric NOT NULL,
    "transaction_timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."transactions" OWNER TO "postgres";


ALTER TABLE "public"."transactions" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."transactions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."uniswap_pool" (
    "id" integer NOT NULL,
    "market_id" "text" NOT NULL,
    "token0" "text" NOT NULL,
    "token1" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "token0_uuid" "uuid",
    "token1_uuid" "uuid"
);


ALTER TABLE "public"."uniswap_pool" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."uniswap_pool_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."uniswap_pool_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."uniswap_pool_id_seq" OWNED BY "public"."uniswap_pool"."id";



CREATE TABLE IF NOT EXISTS "public"."user" (
    "address" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "notifications_enabled" boolean DEFAULT false NOT NULL,
    "telegram" "text"
);


ALTER TABLE "public"."user" OWNER TO "postgres";


COMMENT ON COLUMN "public"."user"."address" IS 'User''s wallet address';



COMMENT ON COLUMN "public"."user"."notifications_enabled" IS 'Whether user is opted in to notifications';



CREATE TABLE IF NOT EXISTS "public"."user_market_collateral" (
    "id" bigint NOT NULL,
    "user_address" "text" NOT NULL,
    "balance" numeric DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "market_id" "text"
);


ALTER TABLE "public"."user_market_collateral" OWNER TO "postgres";


ALTER TABLE "public"."user_market_collateral" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."user_market_collateral_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."whitelisted_collateral" (
    "id" integer NOT NULL,
    "collateral_address" "text" NOT NULL,
    "collateral_name" "text",
    "is_default" boolean DEFAULT false,
    "engine" "text",
    "chainlink_adapter" "text",
    "pyth_adapter" "text",
    "uniswap_adapter" "text",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."whitelisted_collateral" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."whitelisted_collateral_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."whitelisted_collateral_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."whitelisted_collateral_id_seq" OWNED BY "public"."whitelisted_collateral"."id";



ALTER TABLE ONLY "public"."market_collateral" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."market_collateral_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."market_perp" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."market_perp_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."uniswap_pool" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."uniswap_pool_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."whitelisted_collateral" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."whitelisted_collateral_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."asset"
    ADD CONSTRAINT "asset_pkey" PRIMARY KEY ("uuid");



ALTER TABLE ONLY "public"."balance"
    ADD CONSTRAINT "balance_pkey" PRIMARY KEY ("address");



ALTER TABLE ONLY "public"."chainlink_price_feed"
    ADD CONSTRAINT "chainlink_price_feed_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."document_sections"
    ADD CONSTRAINT "document_sections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."market_collateral"
    ADD CONSTRAINT "market_collateral_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "market_controller_key" UNIQUE ("controller");



ALTER TABLE ONLY "public"."market_metric"
    ADD CONSTRAINT "market_metric_pkey" PRIMARY KEY ("market_id");



ALTER TABLE ONLY "public"."market_perp"
    ADD CONSTRAINT "market_perp_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "market_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "markets_label_key" UNIQUE ("label");



ALTER TABLE ONLY "public"."portfolio_health"
    ADD CONSTRAINT "portfolio_health_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pyth_price_feed"
    ADD CONSTRAINT "pyth_price_feed_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."temp_market_data"
    ADD CONSTRAINT "temp_market_data_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset"
    ADD CONSTRAINT "tokens_uuid_key" UNIQUE ("uuid");



ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."chainlink_price_feed"
    ADD CONSTRAINT "unique_asset_numeraire_chainlink" UNIQUE ("asset", "numeraire");



ALTER TABLE ONLY "public"."pyth_price_feed"
    ADD CONSTRAINT "unique_asset_numeraire_pyth" UNIQUE ("asset", "numeraire");



ALTER TABLE ONLY "public"."uniswap_pool"
    ADD CONSTRAINT "uniswap_pool_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_market_collateral"
    ADD CONSTRAINT "user_market_collateral_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("address");



ALTER TABLE ONLY "public"."whitelisted_collateral"
    ADD CONSTRAINT "whitelisted_collateral_collateral_address_key" UNIQUE ("collateral_address");



ALTER TABLE ONLY "public"."whitelisted_collateral"
    ADD CONSTRAINT "whitelisted_collateral_pkey" PRIMARY KEY ("id");



CREATE INDEX "document_sections_embedding_idx" ON "public"."document_sections" USING "hnsw" ("embedding" "extensions"."vector_ip_ops");



CREATE INDEX "idx_market_collateral_collateral_address" ON "public"."market_collateral" USING "btree" ("collateral_address");



CREATE INDEX "idx_market_collateral_market_id" ON "public"."market_collateral" USING "btree" ("market_id");



CREATE INDEX "idx_market_metrics_market_id" ON "public"."market_metric" USING "btree" ("market_id");



CREATE INDEX "idx_market_perps_market_id" ON "public"."market_perp" USING "btree" ("market_id");



CREATE UNIQUE INDEX "idx_market_perps_unique_perp_type" ON "public"."market_perp" USING "btree" ("market_id", "perp_type");



CREATE INDEX "idx_temp_market_data_market_id" ON "public"."temp_market_data" USING "btree" ("market_id");



CREATE INDEX "idx_uniswap_pool_market_token" ON "public"."uniswap_pool" USING "btree" ("market_id", "token0", "token1");



CREATE INDEX "markets_controller_idx" ON "public"."market" USING "btree" ("controller");



CREATE INDEX "markets_deployer_idx" ON "public"."market" USING "btree" ("deployer");



CREATE OR REPLACE TRIGGER "embed" AFTER INSERT ON "public"."document_sections" FOR EACH ROW EXECUTE FUNCTION "supabase_functions"."http_request"('https://iyzpghlzpofnklzeeiws.supabase.co/functions/v1/embed', 'POST', '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5enBnaGx6cG9mbmtsemVlaXdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODA1ODU0MCwiZXhwIjoyMDQzNjM0NTQwfQ.l1nCylAJdTaheaPwAC23sOZ1z5nXJNkqbJZjF8VcKeo"}', '{}', '1000');



CREATE OR REPLACE TRIGGER "embed_document_sections" AFTER INSERT ON "public"."document_sections" REFERENCING NEW TABLE AS "inserted" FOR EACH STATEMENT EXECUTE FUNCTION "private"."embed"('content', 'embedding');



ALTER TABLE ONLY "public"."balance"
    ADD CONSTRAINT "balance_address_fkey" FOREIGN KEY ("address") REFERENCES "public"."user"("address");



ALTER TABLE ONLY "public"."balance"
    ADD CONSTRAINT "balance_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id");



ALTER TABLE ONLY "public"."chainlink_price_feed"
    ADD CONSTRAINT "chainlink_price_feed_asset_fkey" FOREIGN KEY ("asset_uuid") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."chainlink_price_feed"
    ADD CONSTRAINT "chainlink_price_feed_numeraire_fkey" FOREIGN KEY ("numeraire_uuid") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."document_sections"
    ADD CONSTRAINT "document_sections_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_storage_object_id_fkey" FOREIGN KEY ("storage_object_id") REFERENCES "storage"."objects"("id");



ALTER TABLE ONLY "public"."market_collateral"
    ADD CONSTRAINT "market_collateral_collateral_address_fkey" FOREIGN KEY ("collateral_address") REFERENCES "public"."whitelisted_collateral"("collateral_address");



ALTER TABLE ONLY "public"."market_collateral"
    ADD CONSTRAINT "market_collateral_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id");



ALTER TABLE ONLY "public"."market_metric"
    ADD CONSTRAINT "market_metric_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "market_numeraire_fkey" FOREIGN KEY ("numeraire") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."market_perp"
    ADD CONSTRAINT "market_perp_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id");



ALTER TABLE ONLY "public"."market"
    ADD CONSTRAINT "market_underlier_fkey" FOREIGN KEY ("underlier") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."portfolio_health"
    ADD CONSTRAINT "portfolio_health_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."portfolio_health"
    ADD CONSTRAINT "portfolio_health_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "public"."user"("address") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pyth_price_feed"
    ADD CONSTRAINT "pyth_price_feed_asset_fkey" FOREIGN KEY ("asset_uuid") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."pyth_price_feed"
    ADD CONSTRAINT "pyth_price_feed_numeraire_fkey" FOREIGN KEY ("numeraire_uuid") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."temp_market_data"
    ADD CONSTRAINT "temp_market_data_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id");



ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_perp_id_fkey" FOREIGN KEY ("perp_id") REFERENCES "public"."market_perp"("id");



ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_token_fkey" FOREIGN KEY ("token") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."uniswap_pool"
    ADD CONSTRAINT "uniswap_pool_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id");



ALTER TABLE ONLY "public"."uniswap_pool"
    ADD CONSTRAINT "uniswap_pool_token0_uuid_fkey" FOREIGN KEY ("token0_uuid") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."uniswap_pool"
    ADD CONSTRAINT "uniswap_pool_token1_uuid_fkey" FOREIGN KEY ("token1_uuid") REFERENCES "public"."asset"("uuid");



ALTER TABLE ONLY "public"."user_market_collateral"
    ADD CONSTRAINT "user_market_collateral_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "public"."market"("id");



ALTER TABLE ONLY "public"."user_market_collateral"
    ADD CONSTRAINT "user_market_collateral_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "public"."user"("address") ON DELETE CASCADE;



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



GRANT ALL ON FUNCTION "public"."aggregate_market_metrics"("sort_field" "text", "sort_direction" "text", "page_limit" integer, "page_offset" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."aggregate_market_metrics"("sort_field" "text", "sort_direction" "text", "page_limit" integer, "page_offset" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."aggregate_market_metrics"("sort_field" "text", "sort_direction" "text", "page_limit" integer, "page_offset" integer) TO "service_role";



GRANT ALL ON TABLE "public"."document_sections" TO "anon";
GRANT ALL ON TABLE "public"."document_sections" TO "authenticated";
GRANT ALL ON TABLE "public"."document_sections" TO "service_role";



GRANT ALL ON FUNCTION "public"."match_document_sections"("embedding" "extensions"."vector", "match_threshold" double precision) TO "anon";
GRANT ALL ON FUNCTION "public"."match_document_sections"("embedding" "extensions"."vector", "match_threshold" double precision) TO "authenticated";
GRANT ALL ON FUNCTION "public"."match_document_sections"("embedding" "extensions"."vector", "match_threshold" double precision) TO "service_role";



GRANT ALL ON FUNCTION "public"."supabase_url"() TO "anon";
GRANT ALL ON FUNCTION "public"."supabase_url"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."supabase_url"() TO "service_role";



GRANT ALL ON TABLE "public"."asset" TO "anon";
GRANT ALL ON TABLE "public"."asset" TO "authenticated";
GRANT ALL ON TABLE "public"."asset" TO "service_role";



GRANT ALL ON TABLE "public"."balance" TO "anon";
GRANT ALL ON TABLE "public"."balance" TO "authenticated";
GRANT ALL ON TABLE "public"."balance" TO "service_role";



GRANT ALL ON TABLE "public"."chainlink_price_feed" TO "anon";
GRANT ALL ON TABLE "public"."chainlink_price_feed" TO "authenticated";
GRANT ALL ON TABLE "public"."chainlink_price_feed" TO "service_role";



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



GRANT ALL ON TABLE "public"."market_collateral" TO "anon";
GRANT ALL ON TABLE "public"."market_collateral" TO "authenticated";
GRANT ALL ON TABLE "public"."market_collateral" TO "service_role";



GRANT ALL ON SEQUENCE "public"."market_collateral_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."market_collateral_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."market_collateral_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."market_metric" TO "anon";
GRANT ALL ON TABLE "public"."market_metric" TO "authenticated";
GRANT ALL ON TABLE "public"."market_metric" TO "service_role";



GRANT ALL ON TABLE "public"."market_perp" TO "anon";
GRANT ALL ON TABLE "public"."market_perp" TO "authenticated";
GRANT ALL ON TABLE "public"."market_perp" TO "service_role";



GRANT ALL ON SEQUENCE "public"."market_perp_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."market_perp_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."market_perp_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."portfolio_health" TO "anon";
GRANT ALL ON TABLE "public"."portfolio_health" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolio_health" TO "service_role";



GRANT ALL ON SEQUENCE "public"."portfolio_health_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."portfolio_health_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."portfolio_health_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."pyth_price_feed" TO "anon";
GRANT ALL ON TABLE "public"."pyth_price_feed" TO "authenticated";
GRANT ALL ON TABLE "public"."pyth_price_feed" TO "service_role";



GRANT ALL ON TABLE "public"."temp_market_data" TO "anon";
GRANT ALL ON TABLE "public"."temp_market_data" TO "authenticated";
GRANT ALL ON TABLE "public"."temp_market_data" TO "service_role";



GRANT ALL ON SEQUENCE "public"."temp_market_data_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."temp_market_data_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."temp_market_data_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."transactions" TO "anon";
GRANT ALL ON TABLE "public"."transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."transactions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."transactions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."transactions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."transactions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."uniswap_pool" TO "anon";
GRANT ALL ON TABLE "public"."uniswap_pool" TO "authenticated";
GRANT ALL ON TABLE "public"."uniswap_pool" TO "service_role";



GRANT ALL ON SEQUENCE "public"."uniswap_pool_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."uniswap_pool_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."uniswap_pool_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";



GRANT ALL ON TABLE "public"."user_market_collateral" TO "anon";
GRANT ALL ON TABLE "public"."user_market_collateral" TO "authenticated";
GRANT ALL ON TABLE "public"."user_market_collateral" TO "service_role";



GRANT ALL ON SEQUENCE "public"."user_market_collateral_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_market_collateral_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_market_collateral_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."whitelisted_collateral" TO "anon";
GRANT ALL ON TABLE "public"."whitelisted_collateral" TO "authenticated";
GRANT ALL ON TABLE "public"."whitelisted_collateral" TO "service_role";



GRANT ALL ON SEQUENCE "public"."whitelisted_collateral_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."whitelisted_collateral_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."whitelisted_collateral_id_seq" TO "service_role";



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
