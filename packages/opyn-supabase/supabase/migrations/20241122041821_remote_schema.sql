create table "public"."temp_market_data" (
    "id" bigint generated always as identity not null,
    "market_id" text not null,
    "index_price" numeric not null,
    "mark_price" numeric not null,
    "change_24hr" numeric not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


CREATE INDEX idx_temp_market_data_market_id ON public.temp_market_data USING btree (market_id);

CREATE UNIQUE INDEX temp_market_data_pkey ON public.temp_market_data USING btree (id);

alter table "public"."temp_market_data" add constraint "temp_market_data_pkey" PRIMARY KEY using index "temp_market_data_pkey";

alter table "public"."temp_market_data" add constraint "temp_market_data_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) ON DELETE CASCADE not valid;

alter table "public"."temp_market_data" validate constraint "temp_market_data_market_id_fkey";

grant delete on table "public"."temp_market_data" to "anon";

grant insert on table "public"."temp_market_data" to "anon";

grant references on table "public"."temp_market_data" to "anon";

grant select on table "public"."temp_market_data" to "anon";

grant trigger on table "public"."temp_market_data" to "anon";

grant truncate on table "public"."temp_market_data" to "anon";

grant update on table "public"."temp_market_data" to "anon";

grant delete on table "public"."temp_market_data" to "authenticated";

grant insert on table "public"."temp_market_data" to "authenticated";

grant references on table "public"."temp_market_data" to "authenticated";

grant select on table "public"."temp_market_data" to "authenticated";

grant trigger on table "public"."temp_market_data" to "authenticated";

grant truncate on table "public"."temp_market_data" to "authenticated";

grant update on table "public"."temp_market_data" to "authenticated";

grant delete on table "public"."temp_market_data" to "service_role";

grant insert on table "public"."temp_market_data" to "service_role";

grant references on table "public"."temp_market_data" to "service_role";

grant select on table "public"."temp_market_data" to "service_role";

grant trigger on table "public"."temp_market_data" to "service_role";

grant truncate on table "public"."temp_market_data" to "service_role";

grant update on table "public"."temp_market_data" to "service_role";


