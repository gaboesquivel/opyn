revoke delete on table "public"."markets" from "anon";

revoke insert on table "public"."markets" from "anon";

revoke references on table "public"."markets" from "anon";

revoke select on table "public"."markets" from "anon";

revoke trigger on table "public"."markets" from "anon";

revoke truncate on table "public"."markets" from "anon";

revoke update on table "public"."markets" from "anon";

revoke delete on table "public"."markets" from "authenticated";

revoke insert on table "public"."markets" from "authenticated";

revoke references on table "public"."markets" from "authenticated";

revoke select on table "public"."markets" from "authenticated";

revoke trigger on table "public"."markets" from "authenticated";

revoke truncate on table "public"."markets" from "authenticated";

revoke update on table "public"."markets" from "authenticated";

revoke delete on table "public"."markets" from "service_role";

revoke insert on table "public"."markets" from "service_role";

revoke references on table "public"."markets" from "service_role";

revoke select on table "public"."markets" from "service_role";

revoke trigger on table "public"."markets" from "service_role";

revoke truncate on table "public"."markets" from "service_role";

revoke update on table "public"."markets" from "service_role";

revoke delete on table "public"."tokens" from "anon";

revoke insert on table "public"."tokens" from "anon";

revoke references on table "public"."tokens" from "anon";

revoke select on table "public"."tokens" from "anon";

revoke trigger on table "public"."tokens" from "anon";

revoke truncate on table "public"."tokens" from "anon";

revoke update on table "public"."tokens" from "anon";

revoke delete on table "public"."tokens" from "authenticated";

revoke insert on table "public"."tokens" from "authenticated";

revoke references on table "public"."tokens" from "authenticated";

revoke select on table "public"."tokens" from "authenticated";

revoke trigger on table "public"."tokens" from "authenticated";

revoke truncate on table "public"."tokens" from "authenticated";

revoke update on table "public"."tokens" from "authenticated";

revoke delete on table "public"."tokens" from "service_role";

revoke insert on table "public"."tokens" from "service_role";

revoke references on table "public"."tokens" from "service_role";

revoke select on table "public"."tokens" from "service_role";

revoke trigger on table "public"."tokens" from "service_role";

revoke truncate on table "public"."tokens" from "service_role";

revoke update on table "public"."tokens" from "service_role";

revoke delete on table "public"."users" from "anon";

revoke insert on table "public"."users" from "anon";

revoke references on table "public"."users" from "anon";

revoke select on table "public"."users" from "anon";

revoke trigger on table "public"."users" from "anon";

revoke truncate on table "public"."users" from "anon";

revoke update on table "public"."users" from "anon";

revoke delete on table "public"."users" from "authenticated";

revoke insert on table "public"."users" from "authenticated";

revoke references on table "public"."users" from "authenticated";

revoke select on table "public"."users" from "authenticated";

revoke trigger on table "public"."users" from "authenticated";

revoke truncate on table "public"."users" from "authenticated";

revoke update on table "public"."users" from "authenticated";

revoke delete on table "public"."users" from "service_role";

revoke insert on table "public"."users" from "service_role";

revoke references on table "public"."users" from "service_role";

revoke select on table "public"."users" from "service_role";

revoke trigger on table "public"."users" from "service_role";

revoke truncate on table "public"."users" from "service_role";

revoke update on table "public"."users" from "service_role";

alter table "public"."markets" drop constraint "markets_base_asset_fkey";

alter table "public"."markets" drop constraint "markets_label_key";

alter table "public"."markets" drop constraint "markets_quote_asset_fkey";

alter table "public"."tokens" drop constraint "tokens_uuid_key";

alter table "public"."markets" drop constraint "markets_pkey";

alter table "public"."tokens" drop constraint "tokens_pkey";

alter table "public"."users" drop constraint "users_pkey";

drop index if exists "public"."markets_label_key";

drop index if exists "public"."markets_pkey";

drop index if exists "public"."tokens_pkey";

drop index if exists "public"."tokens_uuid_key";

drop index if exists "public"."users_pkey";

drop table "public"."markets";

drop table "public"."tokens";

drop table "public"."users";

create table "public"."market" (
    "address" text not null,
    "created_at" timestamp with time zone not null default now(),
    "label" text not null,
    "base_asset" uuid not null,
    "quote_asset" uuid not null
);


create table "public"."token" (
    "address" text not null,
    "symbol" text not null,
    "chain_id" smallint not null,
    "decimals" smallint,
    "created_at" timestamp with time zone not null default now(),
    "uuid" uuid not null default gen_random_uuid()
);


create table "public"."user" (
    "address" text not null,
    "created_at" timestamp with time zone not null default now(),
    "ens" text,
    "notifs" boolean,
    "telegram" text
);


CREATE UNIQUE INDEX markets_label_key ON public.market USING btree (label);

CREATE UNIQUE INDEX markets_pkey ON public.market USING btree (address);

CREATE UNIQUE INDEX tokens_pkey ON public.token USING btree (address, symbol, chain_id);

CREATE UNIQUE INDEX tokens_uuid_key ON public.token USING btree (uuid);

CREATE UNIQUE INDEX users_pkey ON public."user" USING btree (address);

alter table "public"."market" add constraint "markets_pkey" PRIMARY KEY using index "markets_pkey";

alter table "public"."token" add constraint "tokens_pkey" PRIMARY KEY using index "tokens_pkey";

alter table "public"."user" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."market" add constraint "markets_base_asset_fkey" FOREIGN KEY (base_asset) REFERENCES token(uuid) not valid;

alter table "public"."market" validate constraint "markets_base_asset_fkey";

alter table "public"."market" add constraint "markets_label_key" UNIQUE using index "markets_label_key";

alter table "public"."market" add constraint "markets_quote_asset_fkey" FOREIGN KEY (quote_asset) REFERENCES token(uuid) not valid;

alter table "public"."market" validate constraint "markets_quote_asset_fkey";

alter table "public"."token" add constraint "tokens_uuid_key" UNIQUE using index "tokens_uuid_key";

grant delete on table "public"."market" to "anon";

grant insert on table "public"."market" to "anon";

grant references on table "public"."market" to "anon";

grant select on table "public"."market" to "anon";

grant trigger on table "public"."market" to "anon";

grant truncate on table "public"."market" to "anon";

grant update on table "public"."market" to "anon";

grant delete on table "public"."market" to "authenticated";

grant insert on table "public"."market" to "authenticated";

grant references on table "public"."market" to "authenticated";

grant select on table "public"."market" to "authenticated";

grant trigger on table "public"."market" to "authenticated";

grant truncate on table "public"."market" to "authenticated";

grant update on table "public"."market" to "authenticated";

grant delete on table "public"."market" to "service_role";

grant insert on table "public"."market" to "service_role";

grant references on table "public"."market" to "service_role";

grant select on table "public"."market" to "service_role";

grant trigger on table "public"."market" to "service_role";

grant truncate on table "public"."market" to "service_role";

grant update on table "public"."market" to "service_role";

grant delete on table "public"."token" to "anon";

grant insert on table "public"."token" to "anon";

grant references on table "public"."token" to "anon";

grant select on table "public"."token" to "anon";

grant trigger on table "public"."token" to "anon";

grant truncate on table "public"."token" to "anon";

grant update on table "public"."token" to "anon";

grant delete on table "public"."token" to "authenticated";

grant insert on table "public"."token" to "authenticated";

grant references on table "public"."token" to "authenticated";

grant select on table "public"."token" to "authenticated";

grant trigger on table "public"."token" to "authenticated";

grant truncate on table "public"."token" to "authenticated";

grant update on table "public"."token" to "authenticated";

grant delete on table "public"."token" to "service_role";

grant insert on table "public"."token" to "service_role";

grant references on table "public"."token" to "service_role";

grant select on table "public"."token" to "service_role";

grant trigger on table "public"."token" to "service_role";

grant truncate on table "public"."token" to "service_role";

grant update on table "public"."token" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";


