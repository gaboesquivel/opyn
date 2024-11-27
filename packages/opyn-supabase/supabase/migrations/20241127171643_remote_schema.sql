alter table "public"."token" drop constraint "tokens_pkey";

drop index if exists "public"."tokens_pkey";

CREATE UNIQUE INDEX token_pkey ON public.token USING btree (uuid);

alter table "public"."token" add constraint "token_pkey" PRIMARY KEY using index "token_pkey";


