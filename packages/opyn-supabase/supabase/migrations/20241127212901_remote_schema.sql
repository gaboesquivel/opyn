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

alter table "public"."token" drop constraint "tokens_uuid_key";

alter table "public"."token" drop constraint "token_pkey";

drop index if exists "public"."token_pkey";

drop index if exists "public"."tokens_uuid_key";

drop table "public"."token";

create table "public"."asset" (
    "address" text not null,
    "symbol" text not null,
    "chain_id" smallint not null,
    "decimals" smallint not null default '18'::smallint,
    "created_at" timestamp with time zone not null default now(),
    "uuid" uuid not null default gen_random_uuid(),
    "name" text not null,
    "stablecoin" boolean not null default false
);


CREATE UNIQUE INDEX token_pkey ON public.asset USING btree (uuid);

CREATE UNIQUE INDEX tokens_uuid_key ON public.asset USING btree (uuid);

alter table "public"."asset" add constraint "token_pkey" PRIMARY KEY using index "token_pkey";

alter table "public"."asset" add constraint "tokens_uuid_key" UNIQUE using index "tokens_uuid_key";

alter table "public"."market" add constraint "market_protocol_asset_fkey" FOREIGN KEY (protocol_asset) REFERENCES asset(uuid) not valid;

alter table "public"."market" validate constraint "market_protocol_asset_fkey";

alter table "public"."market" add constraint "market_protocol_numeraire_fkey" FOREIGN KEY (protocol_numeraire) REFERENCES asset(uuid) not valid;

alter table "public"."market" validate constraint "market_protocol_numeraire_fkey";

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


