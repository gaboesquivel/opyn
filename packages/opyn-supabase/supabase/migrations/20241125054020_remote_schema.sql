revoke delete on table "public"."token" from "anon";

revoke insert on table "public"."token" from "anon";

revoke references on table "public"."token" from "anon";

revoke select on table "public"."token" from "anon";

revoke trigger on table "public"."token" from "anon";

revoke truncate on table "public"."token" from "anon";

revoke update on table "public"."token" from "anon";

revoke delete on table "public"."token" from "authenticated";

revoke insert on table "public"."token" from "authenticated";

revoke references on table "public"."token" from "authenticated";

revoke select on table "public"."token" from "authenticated";

revoke trigger on table "public"."token" from "authenticated";

revoke truncate on table "public"."token" from "authenticated";

revoke update on table "public"."token" from "authenticated";

revoke delete on table "public"."token" from "service_role";

revoke insert on table "public"."token" from "service_role";

revoke references on table "public"."token" from "service_role";

revoke select on table "public"."token" from "service_role";

revoke trigger on table "public"."token" from "service_role";

revoke truncate on table "public"."token" from "service_role";

revoke update on table "public"."token" from "service_role";

alter table "public"."market" drop constraint "market_protocol_asset_fkey";

alter table "public"."market" drop constraint "market_protocol_numeraire_fkey";

alter table "public"."token" drop constraint "tokens_uuid_key";

alter table "public"."chainlink_price_feed" drop constraint "chainlink_price_feed_asset_fkey";

alter table "public"."chainlink_price_feed" drop constraint "chainlink_price_feed_numeraire_fkey";

alter table "public"."pyth_price_feed" drop constraint "pyth_price_feed_asset_fkey";

alter table "public"."pyth_price_feed" drop constraint "pyth_price_feed_numeraire_fkey";

alter table "public"."transactions" drop constraint "transactions_token_fkey";

alter table "public"."uniswap_pool" drop constraint "uniswap_pool_token0_uuid_fkey";

alter table "public"."uniswap_pool" drop constraint "uniswap_pool_token1_uuid_fkey";

alter table "public"."token" drop constraint "tokens_pkey";

-- drop index if exists "public"."tokens_pkey";

-- drop index if exists "public"."tokens_uuid_key";

-- NOTE: this was giving problems
-- drop table "public"."token";

create table "public"."asset" (
    "address" text not null,
    "symbol" text not null,
    "decimals" smallint not null default '18'::smallint,
    "created_at" timestamp with time zone not null default now(),
    "uuid" uuid not null default gen_random_uuid(),
    "name" text not null,
    "stablecoin" boolean not null default false
);


create table "public"."balance" (
    "address" text not null,
    "market_id" text,
    "zero" bigint,
    "half" bigint,
    "one" bigint,
    "two" bigint
);


alter table "public"."balance" enable row level security;

create table "public"."user_market_collateral" (
    "id" bigint generated always as identity not null,
    "user_address" text not null,
    "balance" numeric not null default 0,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "market_id" text
);


alter table "public"."market" drop column "protocol_asset";

alter table "public"."market" drop column "protocol_numeraire";

alter table "public"."market" add column "numeraire" uuid not null;

alter table "public"."market" add column "underlier" uuid not null;

CREATE UNIQUE INDEX asset_pkey ON public.asset USING btree (uuid);

CREATE UNIQUE INDEX balance_pkey ON public.balance USING btree (address);

CREATE UNIQUE INDEX user_market_collateral_pkey ON public.user_market_collateral USING btree (id);

CREATE UNIQUE INDEX tokens_uuid_key ON public.asset USING btree (uuid);

alter table "public"."asset" add constraint "asset_pkey" PRIMARY KEY using index "asset_pkey";

alter table "public"."balance" add constraint "balance_pkey" PRIMARY KEY using index "balance_pkey";

alter table "public"."user_market_collateral" add constraint "user_market_collateral_pkey" PRIMARY KEY using index "user_market_collateral_pkey";

alter table "public"."asset" add constraint "tokens_uuid_key" UNIQUE using index "tokens_uuid_key";

alter table "public"."balance" add constraint "balance_address_fkey" FOREIGN KEY (address) REFERENCES "user"(address) not valid;

alter table "public"."balance" validate constraint "balance_address_fkey";

alter table "public"."balance" add constraint "balance_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) not valid;

alter table "public"."balance" validate constraint "balance_market_id_fkey";

alter table "public"."market" add constraint "market_numeraire_fkey" FOREIGN KEY (numeraire) REFERENCES asset(uuid) not valid;

alter table "public"."market" validate constraint "market_numeraire_fkey";

alter table "public"."market" add constraint "market_underlier_fkey" FOREIGN KEY (underlier) REFERENCES asset(uuid) not valid;

alter table "public"."market" validate constraint "market_underlier_fkey";

alter table "public"."user_market_collateral" add constraint "user_market_collateral_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) not valid;

alter table "public"."user_market_collateral" validate constraint "user_market_collateral_market_id_fkey";

alter table "public"."user_market_collateral" add constraint "user_market_collateral_user_address_fkey" FOREIGN KEY (user_address) REFERENCES "user"(address) ON DELETE CASCADE not valid;

alter table "public"."user_market_collateral" validate constraint "user_market_collateral_user_address_fkey";

alter table "public"."chainlink_price_feed" add constraint "chainlink_price_feed_asset_fkey" FOREIGN KEY (asset_uuid) REFERENCES asset(uuid) not valid;

alter table "public"."chainlink_price_feed" validate constraint "chainlink_price_feed_asset_fkey";

alter table "public"."chainlink_price_feed" add constraint "chainlink_price_feed_numeraire_fkey" FOREIGN KEY (numeraire_uuid) REFERENCES asset(uuid) not valid;

alter table "public"."chainlink_price_feed" validate constraint "chainlink_price_feed_numeraire_fkey";

alter table "public"."pyth_price_feed" add constraint "pyth_price_feed_asset_fkey" FOREIGN KEY (asset_uuid) REFERENCES asset(uuid) not valid;

alter table "public"."pyth_price_feed" validate constraint "pyth_price_feed_asset_fkey";

alter table "public"."pyth_price_feed" add constraint "pyth_price_feed_numeraire_fkey" FOREIGN KEY (numeraire_uuid) REFERENCES asset(uuid) not valid;

alter table "public"."pyth_price_feed" validate constraint "pyth_price_feed_numeraire_fkey";

alter table "public"."transactions" add constraint "transactions_token_fkey" FOREIGN KEY (token) REFERENCES asset(uuid) not valid;

alter table "public"."transactions" validate constraint "transactions_token_fkey";

alter table "public"."uniswap_pool" add constraint "uniswap_pool_token0_uuid_fkey" FOREIGN KEY (token0_uuid) REFERENCES asset(uuid) not valid;

alter table "public"."uniswap_pool" validate constraint "uniswap_pool_token0_uuid_fkey";

alter table "public"."uniswap_pool" add constraint "uniswap_pool_token1_uuid_fkey" FOREIGN KEY (token1_uuid) REFERENCES asset(uuid) not valid;

alter table "public"."uniswap_pool" validate constraint "uniswap_pool_token1_uuid_fkey";

grant delete on table "public"."asset" to "anon";

grant insert on table "public"."asset" to "anon";

grant references on table "public"."asset" to "anon";

grant select on table "public"."asset" to "anon";

grant trigger on table "public"."asset" to "anon";

grant truncate on table "public"."asset" to "anon";

grant update on table "public"."asset" to "anon";

grant delete on table "public"."asset" to "authenticated";

grant insert on table "public"."asset" to "authenticated";

grant references on table "public"."asset" to "authenticated";

grant select on table "public"."asset" to "authenticated";

grant trigger on table "public"."asset" to "authenticated";

grant truncate on table "public"."asset" to "authenticated";

grant update on table "public"."asset" to "authenticated";

grant delete on table "public"."asset" to "service_role";

grant insert on table "public"."asset" to "service_role";

grant references on table "public"."asset" to "service_role";

grant select on table "public"."asset" to "service_role";

grant trigger on table "public"."asset" to "service_role";

grant truncate on table "public"."asset" to "service_role";

grant update on table "public"."asset" to "service_role";

grant delete on table "public"."balance" to "anon";

grant insert on table "public"."balance" to "anon";

grant references on table "public"."balance" to "anon";

grant select on table "public"."balance" to "anon";

grant trigger on table "public"."balance" to "anon";

grant truncate on table "public"."balance" to "anon";

grant update on table "public"."balance" to "anon";

grant delete on table "public"."balance" to "authenticated";

grant insert on table "public"."balance" to "authenticated";

grant references on table "public"."balance" to "authenticated";

grant select on table "public"."balance" to "authenticated";

grant trigger on table "public"."balance" to "authenticated";

grant truncate on table "public"."balance" to "authenticated";

grant update on table "public"."balance" to "authenticated";

grant delete on table "public"."balance" to "service_role";

grant insert on table "public"."balance" to "service_role";

grant references on table "public"."balance" to "service_role";

grant select on table "public"."balance" to "service_role";

grant trigger on table "public"."balance" to "service_role";

grant truncate on table "public"."balance" to "service_role";

grant update on table "public"."balance" to "service_role";

grant delete on table "public"."user_market_collateral" to "anon";

grant insert on table "public"."user_market_collateral" to "anon";

grant references on table "public"."user_market_collateral" to "anon";

grant select on table "public"."user_market_collateral" to "anon";

grant trigger on table "public"."user_market_collateral" to "anon";

grant truncate on table "public"."user_market_collateral" to "anon";

grant update on table "public"."user_market_collateral" to "anon";

grant delete on table "public"."user_market_collateral" to "authenticated";

grant insert on table "public"."user_market_collateral" to "authenticated";

grant references on table "public"."user_market_collateral" to "authenticated";

grant select on table "public"."user_market_collateral" to "authenticated";

grant trigger on table "public"."user_market_collateral" to "authenticated";

grant truncate on table "public"."user_market_collateral" to "authenticated";

grant update on table "public"."user_market_collateral" to "authenticated";

grant delete on table "public"."user_market_collateral" to "service_role";

grant insert on table "public"."user_market_collateral" to "service_role";

grant references on table "public"."user_market_collateral" to "service_role";

grant select on table "public"."user_market_collateral" to "service_role";

grant trigger on table "public"."user_market_collateral" to "service_role";

grant truncate on table "public"."user_market_collateral" to "service_role";

grant update on table "public"."user_market_collateral" to "service_role";


