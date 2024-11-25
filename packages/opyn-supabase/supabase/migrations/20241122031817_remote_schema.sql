create table "public"."portfolio_health" (
    "id" bigint generated always as identity not null,
    "market_id" text not null,
    "user_address" text not null,
    "health_score" numeric not null,
    "last_updated" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


alter table "public"."token" alter column "decimals" set not null;

CREATE UNIQUE INDEX portfolio_health_pkey ON public.portfolio_health USING btree (id);

alter table "public"."portfolio_health" add constraint "portfolio_health_pkey" PRIMARY KEY using index "portfolio_health_pkey";

alter table "public"."portfolio_health" add constraint "portfolio_health_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) ON DELETE CASCADE not valid;

alter table "public"."portfolio_health" validate constraint "portfolio_health_market_id_fkey";

alter table "public"."portfolio_health" add constraint "portfolio_health_user_address_fkey" FOREIGN KEY (user_address) REFERENCES "user"(address) ON DELETE CASCADE not valid;

alter table "public"."portfolio_health" validate constraint "portfolio_health_user_address_fkey";

grant delete on table "public"."portfolio_health" to "anon";

grant insert on table "public"."portfolio_health" to "anon";

grant references on table "public"."portfolio_health" to "anon";

grant select on table "public"."portfolio_health" to "anon";

grant trigger on table "public"."portfolio_health" to "anon";

grant truncate on table "public"."portfolio_health" to "anon";

grant update on table "public"."portfolio_health" to "anon";

grant delete on table "public"."portfolio_health" to "authenticated";

grant insert on table "public"."portfolio_health" to "authenticated";

grant references on table "public"."portfolio_health" to "authenticated";

grant select on table "public"."portfolio_health" to "authenticated";

grant trigger on table "public"."portfolio_health" to "authenticated";

grant truncate on table "public"."portfolio_health" to "authenticated";

grant update on table "public"."portfolio_health" to "authenticated";

grant delete on table "public"."portfolio_health" to "service_role";

grant insert on table "public"."portfolio_health" to "service_role";

grant references on table "public"."portfolio_health" to "service_role";

grant select on table "public"."portfolio_health" to "service_role";

grant trigger on table "public"."portfolio_health" to "service_role";

grant truncate on table "public"."portfolio_health" to "service_role";

grant update on table "public"."portfolio_health" to "service_role";


