create table "public"."markets" (
    "address" text not null,
    "created_at" timestamp with time zone not null default now(),
    "label" text not null,
    "base_asset" uuid not null,
    "quote_asset" uuid not null
);


create table "public"."tokens" (
    "address" text not null,
    "symbol" text not null,
    "chain_id" smallint not null,
    "decimals" smallint,
    "created_at" timestamp with time zone not null default now(),
    "uuid" uuid not null default gen_random_uuid()
);


create table "public"."users" (
    "address" text not null,
    "created_at" timestamp with time zone not null default now(),
    "ens" text,
    "notifs" boolean,
    "telegram" text
);


alter table "public"."document_sections" disable row level security;

alter table "public"."documents" disable row level security;

CREATE UNIQUE INDEX markets_label_key ON public.markets USING btree (label);

CREATE UNIQUE INDEX markets_pkey ON public.markets USING btree (address);

CREATE UNIQUE INDEX tokens_pkey ON public.tokens USING btree (address, symbol, chain_id);

CREATE UNIQUE INDEX tokens_uuid_key ON public.tokens USING btree (uuid);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (address);

alter table "public"."markets" add constraint "markets_pkey" PRIMARY KEY using index "markets_pkey";

alter table "public"."tokens" add constraint "tokens_pkey" PRIMARY KEY using index "tokens_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."markets" add constraint "markets_base_asset_fkey" FOREIGN KEY (base_asset) REFERENCES tokens(uuid) not valid;

alter table "public"."markets" validate constraint "markets_base_asset_fkey";

alter table "public"."markets" add constraint "markets_label_key" UNIQUE using index "markets_label_key";

alter table "public"."markets" add constraint "markets_quote_asset_fkey" FOREIGN KEY (quote_asset) REFERENCES tokens(uuid) not valid;

alter table "public"."markets" validate constraint "markets_quote_asset_fkey";

alter table "public"."tokens" add constraint "tokens_uuid_key" UNIQUE using index "tokens_uuid_key";

grant delete on table "public"."markets" to "anon";

grant insert on table "public"."markets" to "anon";

grant references on table "public"."markets" to "anon";

grant select on table "public"."markets" to "anon";

grant trigger on table "public"."markets" to "anon";

grant truncate on table "public"."markets" to "anon";

grant update on table "public"."markets" to "anon";

grant delete on table "public"."markets" to "authenticated";

grant insert on table "public"."markets" to "authenticated";

grant references on table "public"."markets" to "authenticated";

grant select on table "public"."markets" to "authenticated";

grant trigger on table "public"."markets" to "authenticated";

grant truncate on table "public"."markets" to "authenticated";

grant update on table "public"."markets" to "authenticated";

grant delete on table "public"."markets" to "service_role";

grant insert on table "public"."markets" to "service_role";

grant references on table "public"."markets" to "service_role";

grant select on table "public"."markets" to "service_role";

grant trigger on table "public"."markets" to "service_role";

grant truncate on table "public"."markets" to "service_role";

grant update on table "public"."markets" to "service_role";

grant delete on table "public"."tokens" to "anon";

grant insert on table "public"."tokens" to "anon";

grant references on table "public"."tokens" to "anon";

grant select on table "public"."tokens" to "anon";

grant trigger on table "public"."tokens" to "anon";

grant truncate on table "public"."tokens" to "anon";

grant update on table "public"."tokens" to "anon";

grant delete on table "public"."tokens" to "authenticated";

grant insert on table "public"."tokens" to "authenticated";

grant references on table "public"."tokens" to "authenticated";

grant select on table "public"."tokens" to "authenticated";

grant trigger on table "public"."tokens" to "authenticated";

grant truncate on table "public"."tokens" to "authenticated";

grant update on table "public"."tokens" to "authenticated";

grant delete on table "public"."tokens" to "service_role";

grant insert on table "public"."tokens" to "service_role";

grant references on table "public"."tokens" to "service_role";

grant select on table "public"."tokens" to "service_role";

grant trigger on table "public"."tokens" to "service_role";

grant truncate on table "public"."tokens" to "service_role";

grant update on table "public"."tokens" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

-- CREATE TRIGGER embed AFTER INSERT ON public.document_sections FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://iyzpghlzpofnklzeeiws.supabase.co/functions/v1/embed', 'POST', '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5enBnaGx6cG9mbmtsemVlaXdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODA1ODU0MCwiZXhwIjoyMDQzNjM0NTQwfQ.l1nCylAJdTaheaPwAC23sOZ1z5nXJNkqbJZjF8VcKeo"}', '{}', '1000');


