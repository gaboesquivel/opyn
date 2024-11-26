create type "public"."oracle_type" as enum ('CHAINLINK', 'PYTH', 'UNISWAP');

create type "public"."perp_type" as enum ('zero_perp', 'half_perp', 'one_perp', 'two_perp');

create sequence "public"."market_collateral_id_seq";

create sequence "public"."market_perp_id_seq";

create sequence "public"."uniswap_pool_id_seq";

create sequence "public"."whitelisted_collateral_id_seq";

alter table "public"."market" drop constraint "markets_base_asset_fkey";

alter table "public"."market" drop constraint "markets_quote_asset_fkey";

create table "public"."chainlink_price_feed" (
    "id" integer not null,
    "asset" text not null,
    "numeraire" text not null,
    "feed" text not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "asset_uuid" uuid,
    "numeraire_uuid" uuid
);


create table "public"."market_collateral" (
    "id" integer not null default nextval('market_collateral_id_seq'::regclass),
    "market_id" text not null,
    "collateral_address" text not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


create table "public"."market_metric" (
    "market_id" text not null,
    "liquidity" numeric not null default 0,
    "volume_24h" numeric not null default 0,
    "volume_7d" numeric not null default 0,
    "volume_30d" numeric not null default 0,
    "open_interest" numeric not null default 0,
    "num_traders" integer not null default 0,
    "fees_collected" numeric not null default 0,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


create table "public"."market_perp" (
    "id" integer not null default nextval('market_perp_id_seq'::regclass),
    "market_id" text not null,
    "perp_type" perp_type not null,
    "is_active" boolean default true,
    "lower_carry" numeric not null,
    "upper_carry" numeric not null,
    "initial_carry" numeric not null,
    "liquidation_fee" numeric not null,
    "minting_fee" numeric not null,
    "funding_fee" numeric not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


create table "public"."pyth_price_feed" (
    "id" integer not null,
    "asset" text not null,
    "numeraire" text not null,
    "price_id" bytea not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "asset_uuid" uuid,
    "numeraire_uuid" uuid
);


create table "public"."transactions" (
    "id" bigint generated always as identity not null,
    "transaction_hash" text not null,
    "from_address" text not null,
    "to_address" text not null,
    "token" uuid not null,
    "status" text not null,
    "usd_amount" numeric not null,
    "transaction_type" text not null,
    "market_id" text not null,
    "perp_id" bigint not null,
    "quantity_amount" numeric not null,
    "transaction_timestamp" timestamp with time zone not null default CURRENT_TIMESTAMP,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


create table "public"."uniswap_pool" (
    "id" integer not null default nextval('uniswap_pool_id_seq'::regclass),
    "market_id" text not null,
    "token0" text not null,
    "token1" text not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "token0_uuid" uuid,
    "token1_uuid" uuid
);


create table "public"."whitelisted_collateral" (
    "id" integer not null default nextval('whitelisted_collateral_id_seq'::regclass),
    "collateral_address" text not null,
    "collateral_name" text,
    "is_default" boolean default false,
    "engine" text,
    "chainlink_adapter" text,
    "pyth_adapter" text,
    "uniswap_adapter" text,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


alter table "public"."market" drop column "base_asset";

alter table "public"."market" drop column "owner";

alter table "public"."market" drop column "quote_asset";

alter table "public"."market" add column "asset_flo" text not null;

alter table "public"."market" add column "auction" text not null;

alter table "public"."market" add column "controller" text not null;

alter table "public"."market" add column "crab_world" text not null;

alter table "public"."market" add column "deployer" text not null;

alter table "public"."market" add column "half_crab" text not null;

alter table "public"."market" add column "is_active" boolean default true;

alter table "public"."market" add column "is_immutable" boolean default false;

alter table "public"."market" add column "oracle" text;

alter table "public"."market" add column "oracle_type" oracle_type;

alter table "public"."market" add column "power_perp_factory" text;

alter table "public"."market" add column "protocol_asset" uuid not null;

alter table "public"."market" add column "protocol_numeraire" uuid not null;

alter table "public"."market" add column "redemption" text;

alter table "public"."market" add column "safetypool" text;

alter table "public"."market" add column "shutdown" text;

alter table "public"."market" add column "span_margin" text;

alter table "public"."market" add column "stable_flo" text not null;

alter table "public"."market" add column "two_crab" text not null;

alter table "public"."market" add column "updated_at" timestamp with time zone default CURRENT_TIMESTAMP;

alter table "public"."token" add column "stablecoin" boolean not null default false;

alter table "public"."token" alter column "decimals" set default '18'::smallint;

alter table "public"."user" drop column "ens";

alter table "public"."user" drop column "notifs";

alter table "public"."user" add column "notifications_enabled" boolean not null default false;

alter sequence "public"."market_collateral_id_seq" owned by "public"."market_collateral"."id";

alter sequence "public"."market_perp_id_seq" owned by "public"."market_perp"."id";

alter sequence "public"."uniswap_pool_id_seq" owned by "public"."uniswap_pool"."id";

alter sequence "public"."whitelisted_collateral_id_seq" owned by "public"."whitelisted_collateral"."id";

CREATE UNIQUE INDEX chainlink_price_feed_pkey ON public.chainlink_price_feed USING btree (id);

CREATE INDEX idx_market_collateral_collateral_address ON public.market_collateral USING btree (collateral_address);

CREATE INDEX idx_market_collateral_market_id ON public.market_collateral USING btree (market_id);

CREATE INDEX idx_market_metrics_market_id ON public.market_metric USING btree (market_id);

CREATE INDEX idx_market_perps_market_id ON public.market_perp USING btree (market_id);

CREATE UNIQUE INDEX idx_market_perps_unique_perp_type ON public.market_perp USING btree (market_id, perp_type);

CREATE INDEX idx_uniswap_pool_market_token ON public.uniswap_pool USING btree (market_id, token0, token1);

CREATE UNIQUE INDEX market_collateral_pkey ON public.market_collateral USING btree (id);

CREATE UNIQUE INDEX market_controller_key ON public.market USING btree (controller);

CREATE UNIQUE INDEX market_metric_pkey ON public.market_metric USING btree (market_id);

CREATE UNIQUE INDEX market_perp_pkey ON public.market_perp USING btree (id);

CREATE INDEX markets_controller_idx ON public.market USING btree (controller);

CREATE INDEX markets_deployer_idx ON public.market USING btree (deployer);

CREATE UNIQUE INDEX pyth_price_feed_pkey ON public.pyth_price_feed USING btree (id);

CREATE UNIQUE INDEX transactions_pkey ON public.transactions USING btree (id);

CREATE UNIQUE INDEX unique_asset_numeraire_chainlink ON public.chainlink_price_feed USING btree (asset, numeraire);

CREATE UNIQUE INDEX unique_asset_numeraire_pyth ON public.pyth_price_feed USING btree (asset, numeraire);

CREATE UNIQUE INDEX uniswap_pool_pkey ON public.uniswap_pool USING btree (id);

CREATE UNIQUE INDEX whitelisted_collateral_collateral_address_key ON public.whitelisted_collateral USING btree (collateral_address);

CREATE UNIQUE INDEX whitelisted_collateral_pkey ON public.whitelisted_collateral USING btree (id);

alter table "public"."chainlink_price_feed" add constraint "chainlink_price_feed_pkey" PRIMARY KEY using index "chainlink_price_feed_pkey";

alter table "public"."market_collateral" add constraint "market_collateral_pkey" PRIMARY KEY using index "market_collateral_pkey";

alter table "public"."market_metric" add constraint "market_metric_pkey" PRIMARY KEY using index "market_metric_pkey";

alter table "public"."market_perp" add constraint "market_perp_pkey" PRIMARY KEY using index "market_perp_pkey";

alter table "public"."pyth_price_feed" add constraint "pyth_price_feed_pkey" PRIMARY KEY using index "pyth_price_feed_pkey";

alter table "public"."transactions" add constraint "transactions_pkey" PRIMARY KEY using index "transactions_pkey";

alter table "public"."uniswap_pool" add constraint "uniswap_pool_pkey" PRIMARY KEY using index "uniswap_pool_pkey";

alter table "public"."whitelisted_collateral" add constraint "whitelisted_collateral_pkey" PRIMARY KEY using index "whitelisted_collateral_pkey";

alter table "public"."chainlink_price_feed" add constraint "chainlink_price_feed_asset_fkey" FOREIGN KEY (asset_uuid) REFERENCES token(uuid) not valid;

alter table "public"."chainlink_price_feed" validate constraint "chainlink_price_feed_asset_fkey";

alter table "public"."chainlink_price_feed" add constraint "chainlink_price_feed_numeraire_fkey" FOREIGN KEY (numeraire_uuid) REFERENCES token(uuid) not valid;

alter table "public"."chainlink_price_feed" validate constraint "chainlink_price_feed_numeraire_fkey";

alter table "public"."chainlink_price_feed" add constraint "unique_asset_numeraire_chainlink" UNIQUE using index "unique_asset_numeraire_chainlink";

alter table "public"."market" add constraint "market_controller_key" UNIQUE using index "market_controller_key";

alter table "public"."market" add constraint "market_protocol_asset_fkey" FOREIGN KEY (protocol_asset) REFERENCES token(uuid) not valid;

alter table "public"."market" validate constraint "market_protocol_asset_fkey";

alter table "public"."market" add constraint "market_protocol_numeraire_fkey" FOREIGN KEY (protocol_numeraire) REFERENCES token(uuid) not valid;

alter table "public"."market" validate constraint "market_protocol_numeraire_fkey";

alter table "public"."market_collateral" add constraint "market_collateral_collateral_address_fkey" FOREIGN KEY (collateral_address) REFERENCES whitelisted_collateral(collateral_address) not valid;

alter table "public"."market_collateral" validate constraint "market_collateral_collateral_address_fkey";

alter table "public"."market_collateral" add constraint "market_collateral_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) not valid;

alter table "public"."market_collateral" validate constraint "market_collateral_market_id_fkey";

alter table "public"."market_metric" add constraint "market_metric_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) not valid;

alter table "public"."market_metric" validate constraint "market_metric_market_id_fkey";

alter table "public"."market_perp" add constraint "market_perp_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) not valid;

alter table "public"."market_perp" validate constraint "market_perp_market_id_fkey";

alter table "public"."pyth_price_feed" add constraint "pyth_price_feed_asset_fkey" FOREIGN KEY (asset_uuid) REFERENCES token(uuid) not valid;

alter table "public"."pyth_price_feed" validate constraint "pyth_price_feed_asset_fkey";

alter table "public"."pyth_price_feed" add constraint "pyth_price_feed_numeraire_fkey" FOREIGN KEY (numeraire_uuid) REFERENCES token(uuid) not valid;

alter table "public"."pyth_price_feed" validate constraint "pyth_price_feed_numeraire_fkey";

alter table "public"."pyth_price_feed" add constraint "unique_asset_numeraire_pyth" UNIQUE using index "unique_asset_numeraire_pyth";

alter table "public"."transactions" add constraint "transactions_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) not valid;

alter table "public"."transactions" validate constraint "transactions_market_id_fkey";

alter table "public"."transactions" add constraint "transactions_perp_id_fkey" FOREIGN KEY (perp_id) REFERENCES market_perp(id) not valid;

alter table "public"."transactions" validate constraint "transactions_perp_id_fkey";

alter table "public"."transactions" add constraint "transactions_token_fkey" FOREIGN KEY (token) REFERENCES token(uuid) not valid;

alter table "public"."transactions" validate constraint "transactions_token_fkey";

alter table "public"."uniswap_pool" add constraint "uniswap_pool_market_id_fkey" FOREIGN KEY (market_id) REFERENCES market(id) not valid;

alter table "public"."uniswap_pool" validate constraint "uniswap_pool_market_id_fkey";

alter table "public"."uniswap_pool" add constraint "uniswap_pool_token0_uuid_fkey" FOREIGN KEY (token0_uuid) REFERENCES token(uuid) not valid;

alter table "public"."uniswap_pool" validate constraint "uniswap_pool_token0_uuid_fkey";

alter table "public"."uniswap_pool" add constraint "uniswap_pool_token1_uuid_fkey" FOREIGN KEY (token1_uuid) REFERENCES token(uuid) not valid;

alter table "public"."uniswap_pool" validate constraint "uniswap_pool_token1_uuid_fkey";

alter table "public"."whitelisted_collateral" add constraint "whitelisted_collateral_collateral_address_key" UNIQUE using index "whitelisted_collateral_collateral_address_key";

grant delete on table "public"."chainlink_price_feed" to "anon";

grant insert on table "public"."chainlink_price_feed" to "anon";

grant references on table "public"."chainlink_price_feed" to "anon";

grant select on table "public"."chainlink_price_feed" to "anon";

grant trigger on table "public"."chainlink_price_feed" to "anon";

grant truncate on table "public"."chainlink_price_feed" to "anon";

grant update on table "public"."chainlink_price_feed" to "anon";

grant delete on table "public"."chainlink_price_feed" to "authenticated";

grant insert on table "public"."chainlink_price_feed" to "authenticated";

grant references on table "public"."chainlink_price_feed" to "authenticated";

grant select on table "public"."chainlink_price_feed" to "authenticated";

grant trigger on table "public"."chainlink_price_feed" to "authenticated";

grant truncate on table "public"."chainlink_price_feed" to "authenticated";

grant update on table "public"."chainlink_price_feed" to "authenticated";

grant delete on table "public"."chainlink_price_feed" to "service_role";

grant insert on table "public"."chainlink_price_feed" to "service_role";

grant references on table "public"."chainlink_price_feed" to "service_role";

grant select on table "public"."chainlink_price_feed" to "service_role";

grant trigger on table "public"."chainlink_price_feed" to "service_role";

grant truncate on table "public"."chainlink_price_feed" to "service_role";

grant update on table "public"."chainlink_price_feed" to "service_role";

grant delete on table "public"."market_collateral" to "anon";

grant insert on table "public"."market_collateral" to "anon";

grant references on table "public"."market_collateral" to "anon";

grant select on table "public"."market_collateral" to "anon";

grant trigger on table "public"."market_collateral" to "anon";

grant truncate on table "public"."market_collateral" to "anon";

grant update on table "public"."market_collateral" to "anon";

grant delete on table "public"."market_collateral" to "authenticated";

grant insert on table "public"."market_collateral" to "authenticated";

grant references on table "public"."market_collateral" to "authenticated";

grant select on table "public"."market_collateral" to "authenticated";

grant trigger on table "public"."market_collateral" to "authenticated";

grant truncate on table "public"."market_collateral" to "authenticated";

grant update on table "public"."market_collateral" to "authenticated";

grant delete on table "public"."market_collateral" to "service_role";

grant insert on table "public"."market_collateral" to "service_role";

grant references on table "public"."market_collateral" to "service_role";

grant select on table "public"."market_collateral" to "service_role";

grant trigger on table "public"."market_collateral" to "service_role";

grant truncate on table "public"."market_collateral" to "service_role";

grant update on table "public"."market_collateral" to "service_role";

grant delete on table "public"."market_metric" to "anon";

grant insert on table "public"."market_metric" to "anon";

grant references on table "public"."market_metric" to "anon";

grant select on table "public"."market_metric" to "anon";

grant trigger on table "public"."market_metric" to "anon";

grant truncate on table "public"."market_metric" to "anon";

grant update on table "public"."market_metric" to "anon";

grant delete on table "public"."market_metric" to "authenticated";

grant insert on table "public"."market_metric" to "authenticated";

grant references on table "public"."market_metric" to "authenticated";

grant select on table "public"."market_metric" to "authenticated";

grant trigger on table "public"."market_metric" to "authenticated";

grant truncate on table "public"."market_metric" to "authenticated";

grant update on table "public"."market_metric" to "authenticated";

grant delete on table "public"."market_metric" to "service_role";

grant insert on table "public"."market_metric" to "service_role";

grant references on table "public"."market_metric" to "service_role";

grant select on table "public"."market_metric" to "service_role";

grant trigger on table "public"."market_metric" to "service_role";

grant truncate on table "public"."market_metric" to "service_role";

grant update on table "public"."market_metric" to "service_role";

grant delete on table "public"."market_perp" to "anon";

grant insert on table "public"."market_perp" to "anon";

grant references on table "public"."market_perp" to "anon";

grant select on table "public"."market_perp" to "anon";

grant trigger on table "public"."market_perp" to "anon";

grant truncate on table "public"."market_perp" to "anon";

grant update on table "public"."market_perp" to "anon";

grant delete on table "public"."market_perp" to "authenticated";

grant insert on table "public"."market_perp" to "authenticated";

grant references on table "public"."market_perp" to "authenticated";

grant select on table "public"."market_perp" to "authenticated";

grant trigger on table "public"."market_perp" to "authenticated";

grant truncate on table "public"."market_perp" to "authenticated";

grant update on table "public"."market_perp" to "authenticated";

grant delete on table "public"."market_perp" to "service_role";

grant insert on table "public"."market_perp" to "service_role";

grant references on table "public"."market_perp" to "service_role";

grant select on table "public"."market_perp" to "service_role";

grant trigger on table "public"."market_perp" to "service_role";

grant truncate on table "public"."market_perp" to "service_role";

grant update on table "public"."market_perp" to "service_role";

grant delete on table "public"."pyth_price_feed" to "anon";

grant insert on table "public"."pyth_price_feed" to "anon";

grant references on table "public"."pyth_price_feed" to "anon";

grant select on table "public"."pyth_price_feed" to "anon";

grant trigger on table "public"."pyth_price_feed" to "anon";

grant truncate on table "public"."pyth_price_feed" to "anon";

grant update on table "public"."pyth_price_feed" to "anon";

grant delete on table "public"."pyth_price_feed" to "authenticated";

grant insert on table "public"."pyth_price_feed" to "authenticated";

grant references on table "public"."pyth_price_feed" to "authenticated";

grant select on table "public"."pyth_price_feed" to "authenticated";

grant trigger on table "public"."pyth_price_feed" to "authenticated";

grant truncate on table "public"."pyth_price_feed" to "authenticated";

grant update on table "public"."pyth_price_feed" to "authenticated";

grant delete on table "public"."pyth_price_feed" to "service_role";

grant insert on table "public"."pyth_price_feed" to "service_role";

grant references on table "public"."pyth_price_feed" to "service_role";

grant select on table "public"."pyth_price_feed" to "service_role";

grant trigger on table "public"."pyth_price_feed" to "service_role";

grant truncate on table "public"."pyth_price_feed" to "service_role";

grant update on table "public"."pyth_price_feed" to "service_role";

grant delete on table "public"."transactions" to "anon";

grant insert on table "public"."transactions" to "anon";

grant references on table "public"."transactions" to "anon";

grant select on table "public"."transactions" to "anon";

grant trigger on table "public"."transactions" to "anon";

grant truncate on table "public"."transactions" to "anon";

grant update on table "public"."transactions" to "anon";

grant delete on table "public"."transactions" to "authenticated";

grant insert on table "public"."transactions" to "authenticated";

grant references on table "public"."transactions" to "authenticated";

grant select on table "public"."transactions" to "authenticated";

grant trigger on table "public"."transactions" to "authenticated";

grant truncate on table "public"."transactions" to "authenticated";

grant update on table "public"."transactions" to "authenticated";

grant delete on table "public"."transactions" to "service_role";

grant insert on table "public"."transactions" to "service_role";

grant references on table "public"."transactions" to "service_role";

grant select on table "public"."transactions" to "service_role";

grant trigger on table "public"."transactions" to "service_role";

grant truncate on table "public"."transactions" to "service_role";

grant update on table "public"."transactions" to "service_role";

grant delete on table "public"."uniswap_pool" to "anon";

grant insert on table "public"."uniswap_pool" to "anon";

grant references on table "public"."uniswap_pool" to "anon";

grant select on table "public"."uniswap_pool" to "anon";

grant trigger on table "public"."uniswap_pool" to "anon";

grant truncate on table "public"."uniswap_pool" to "anon";

grant update on table "public"."uniswap_pool" to "anon";

grant delete on table "public"."uniswap_pool" to "authenticated";

grant insert on table "public"."uniswap_pool" to "authenticated";

grant references on table "public"."uniswap_pool" to "authenticated";

grant select on table "public"."uniswap_pool" to "authenticated";

grant trigger on table "public"."uniswap_pool" to "authenticated";

grant truncate on table "public"."uniswap_pool" to "authenticated";

grant update on table "public"."uniswap_pool" to "authenticated";

grant delete on table "public"."uniswap_pool" to "service_role";

grant insert on table "public"."uniswap_pool" to "service_role";

grant references on table "public"."uniswap_pool" to "service_role";

grant select on table "public"."uniswap_pool" to "service_role";

grant trigger on table "public"."uniswap_pool" to "service_role";

grant truncate on table "public"."uniswap_pool" to "service_role";

grant update on table "public"."uniswap_pool" to "service_role";

grant delete on table "public"."whitelisted_collateral" to "anon";

grant insert on table "public"."whitelisted_collateral" to "anon";

grant references on table "public"."whitelisted_collateral" to "anon";

grant select on table "public"."whitelisted_collateral" to "anon";

grant trigger on table "public"."whitelisted_collateral" to "anon";

grant truncate on table "public"."whitelisted_collateral" to "anon";

grant update on table "public"."whitelisted_collateral" to "anon";

grant delete on table "public"."whitelisted_collateral" to "authenticated";

grant insert on table "public"."whitelisted_collateral" to "authenticated";

grant references on table "public"."whitelisted_collateral" to "authenticated";

grant select on table "public"."whitelisted_collateral" to "authenticated";

grant trigger on table "public"."whitelisted_collateral" to "authenticated";

grant truncate on table "public"."whitelisted_collateral" to "authenticated";

grant update on table "public"."whitelisted_collateral" to "authenticated";

grant delete on table "public"."whitelisted_collateral" to "service_role";

grant insert on table "public"."whitelisted_collateral" to "service_role";

grant references on table "public"."whitelisted_collateral" to "service_role";

grant select on table "public"."whitelisted_collateral" to "service_role";

grant trigger on table "public"."whitelisted_collateral" to "service_role";

grant truncate on table "public"."whitelisted_collateral" to "service_role";

grant update on table "public"."whitelisted_collateral" to "service_role";


