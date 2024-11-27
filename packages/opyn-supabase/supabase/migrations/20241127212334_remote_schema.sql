alter table "public"."chainlink_price_feed" drop constraint "chainlink_price_feed_asset_fkey";

alter table "public"."chainlink_price_feed" drop constraint "chainlink_price_feed_numeraire_fkey";

alter table "public"."market" drop constraint "market_protocol_asset_fkey";

alter table "public"."market" drop constraint "market_protocol_numeraire_fkey";

alter table "public"."pyth_price_feed" drop constraint "pyth_price_feed_asset_fkey";

alter table "public"."pyth_price_feed" drop constraint "pyth_price_feed_numeraire_fkey";

alter table "public"."transactions" drop constraint "transactions_token_fkey";

alter table "public"."uniswap_pool" drop constraint "uniswap_pool_token0_uuid_fkey";

alter table "public"."uniswap_pool" drop constraint "uniswap_pool_token1_uuid_fkey";

alter table "public"."user_market_collateral" disable row level security;


