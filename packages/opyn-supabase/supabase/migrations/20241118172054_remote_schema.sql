alter table "public"."market" drop constraint "markets_pkey";

drop index if exists "public"."markets_pkey";

alter table "public"."market" drop column "address";

alter table "public"."market" add column "id" text not null;

CREATE UNIQUE INDEX market_pkey ON public.market USING btree (id);

alter table "public"."market" add constraint "market_pkey" PRIMARY KEY using index "market_pkey";


