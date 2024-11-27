
INSERT INTO "public"."asset" ("address", "symbol", "decimals", "created_at", "uuid", "name", "stablecoin", "image_url") VALUES
	('', 'LINK', 18, '2024-11-20 11:24:17.497221+00', '78ea2619-7cf8-484f-aea4-00d4dc95741f', 'Chainlink Token', false, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/chainlink.png'),
	('', 'BNB', 18, '2024-11-20 11:20:42.98974+00', '911b730a-4d81-4aa7-a542-058c56d57854', 'Binance Coin', false, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/wbnb.png'),
	('', 'ETH', 18, '2024-11-20 11:19:09.84371+00', '32bf121d-34ca-41af-91df-739307a51910', 'Ethereum', false, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/ethereum.png'),
	('0x40b5AA1df4E49efA751538a78297d0a6a4a51740', 'FRAX', 18, '2024-11-24 23:28:02+00', 'b9d50b7b-1747-4c46-9f3c-e16eb4a39d02', 'FRAX', true, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/frax.png'),
	('', 'stETH', 18, '2024-11-20 11:22:25.423583+00', 'e9a96514-7c26-4f22-95d1-701490a9337b', 'Staked Ether', false, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/steth.png'),
	('0x34F2FD40331487F0ef23215e3e8c0070557aBC41', 'USDC', 6, '2024-11-20 11:18:45.503679+00', '4ac2474e-0e6e-481d-98fa-31a40e078a58', 'USDC', true, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/usd-coin.png'),
	('0xBb874dA2f9f7fB3168A3A31cC4A27Fc48A5eE5f1', 'USDT', 6, '2024-11-20 11:21:33.30713+00', '70c5f50d-571c-4503-a64c-b6d34ae012eb', 'Tether USD', true, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/tether.png'),
	('0x5c761f0DB7205637EC1A031038984E4200C82AD4', 'DAI', 18, '2024-11-20 11:26:39.360437+00', '8c348f95-ed6b-4e68-85db-1533fa34b378', 'DAI Stablecoin', true, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/multi-collateral-dai.png'),
	('', 'BTC', 8, '2024-11-24 23:09:23.792409+00', '1a870632-0e7d-45ab-b02e-30d935524768', 'Bitcoin', false, 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/bitcoin.png');


INSERT INTO "public"."market" ("id", "created_at", "label", "underlier", "numeraire", "deployer", "controller", "auction", "crab_world", "half_crab", "two_crab", "stable_flo", "asset_flo", "safetypool", "shutdown", "redemption", "span_margin", "oracle", "oracle_type", "power_perp_factory", "is_immutable", "is_active", "updated_at", "2_perp_long", "2_perp_short") VALUES
	('0x99', '2024-11-24 23:36:32.84397+00', 'BTC/FRAX', '1a870632-0e7d-45ab-b02e-30d935524768', 'b9d50b7b-1747-4c46-9f3c-e16eb4a39d02', '0x6c77515a129d323e798c2dedbd13fa8a2affa237', '0x6c77515a129d323e798c2dedbd13fa8a2affa237', '0x10', '0x10', '0x10', '0x10', '0x10', '0x10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, true, '2024-11-24 23:36:32.84397+00', NULL, NULL),
	('0x1', '2024-11-20 11:28:31.260876+00', 'ETH/USDC', '32bf121d-34ca-41af-91df-739307a51910', '4ac2474e-0e6e-481d-98fa-31a40e078a58', '0x822c287e1e07482ad33f833ae5e448fc51b67e49', '0x822c287e1e07482ad33f833ae5e448fc51b67e49', '0x', '0x', '0x', '0x', '0x', '0x', '0x', '0x', '0x', '0x', '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', 'CHAINLINK', '0x1', false, true, '2024-11-20 11:28:31.260876+00', '0xBbdf2fd0d37E0601CfeAFEc05192B7351038faB1', '0x14D3B31321AC7d3b4fC9EaA705a847805fA61690'),
	('0x2', '2024-11-20 11:31:16.666089+00', 'BTC/USDC', '1a870632-0e7d-45ab-b02e-30d935524768', '4ac2474e-0e6e-481d-98fa-31a40e078a58', '0xfdda599c5afbad2607059b4cd75903b1e4c9a727', '0xfdda599c5afbad2607059b4cd75903b1e4c9a727', '0x2', '0x2', '0x2', '0x2', '0x2', '0x2', '0x2', '0x2', '0x2', '0x2', '0x14e613AC84a31f709eadbdF89C6CC390fDc9540A', 'CHAINLINK', '0x2', false, true, '2024-11-20 11:31:16.666089+00', NULL, NULL),
	('0x3', '2024-11-20 11:32:40.685416+00', 'ETH/DAI', '32bf121d-34ca-41af-91df-739307a51910', '8c348f95-ed6b-4e68-85db-1533fa34b378', '0x3020e9f22f036f4e822756fad249a3db5b75b39d', '0x3020e9f22f036f4e822756fad249a3db5b75b39d', '0x3', '0x3', '0x3', '0x3', '0x3', '0x3', '0x3', '0x3', '0x3', '0x3', '0xCfE54B5cD566aB89272946F602D76Ea879CAb4a8', 'CHAINLINK', '0x3', false, true, '2024-11-20 11:32:40.685416+00', NULL, NULL),
	('0x4', '2024-11-20 11:35:51.015245+00', 'LINK/USDT', '78ea2619-7cf8-484f-aea4-00d4dc95741f', '70c5f50d-571c-4503-a64c-b6d34ae012eb', '0xcf930dc8763904e9fb3c355613610e97b49d3702', '0xcf930dc8763904e9fb3c355613610e97b49d3702', '0x4', '0x4', '0x4', '0x4', '0x4', '0x4', '0x4', '0x4', '0x4', '0x4', '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c', 'CHAINLINK', '0x4', false, true, '2024-11-20 11:35:51.015245+00', NULL, NULL),
	('0x5', '2024-11-24 23:30:47+00', 'BTC/DAI', '1a870632-0e7d-45ab-b02e-30d935524768', '8c348f95-ed6b-4e68-85db-1533fa34b378', '0x7d13987dae809b7d9f435624d6343f6b33c306b0', '0x7d13987dae809b7d9f435624d6343f6b33c306b0', '0x5', '0x5', '0x5', '0x5', '0x5', '0x5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, true, '2024-11-24 23:31:21.13759+00', NULL, NULL),
	('0x6', '2024-11-23 23:31:49+00', 'BTC/USDT', '1a870632-0e7d-45ab-b02e-30d935524768', '70c5f50d-571c-4503-a64c-b6d34ae012eb', '0x32150c7ba2bb1dc10b737fb7c09c92175df59da8', '0x32150c7ba2bb1dc10b737fb7c09c92175df59da8', '0x6', '0x6', '0x6', '0x6', '0x6', '0x6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, true, '2024-11-24 23:32:16.726614+00', NULL, NULL),
	('0x7', '2024-11-17 23:32:33+00', 'ETH/USDT', '32bf121d-34ca-41af-91df-739307a51910', '70c5f50d-571c-4503-a64c-b6d34ae012eb', '0x0af36714caed7ad0d48773de8795482706104db3', '0x0af36714caed7ad0d48773de8795482706104db3', '0x7', '0x7', '0x7', '0x7', '0x7', '0x7', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, true, '2024-11-24 23:33:13.396958+00', NULL, NULL),
	('0x8', '2024-11-24 23:33:39+00', 'LINK/DAI', '78ea2619-7cf8-484f-aea4-00d4dc95741f', '8c348f95-ed6b-4e68-85db-1533fa34b378', '0xee45d36f88301dc3c4b2b4a43fdaf041556f70be', '0xee45d36f88301dc3c4b2b4a43fdaf041556f70be', '0x8', '0x8', '0x8', '0x8', '0x8', '0x8', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, true, '2024-11-24 23:34:13.025597+00', NULL, NULL),
	('0x9', '2024-11-24 23:34:48+00', 'ETH/FRAX', '32bf121d-34ca-41af-91df-739307a51910', 'b9d50b7b-1747-4c46-9f3c-e16eb4a39d02', '0x9aa12be33b340a4ad77b4596d3f1551af12664ec', '0x9aa12be33b340a4ad77b4596d3f1551af12664ec', '0x9', '0x9', '0x9', '0x9', '0x9', '0x9', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, true, '2024-11-24 23:35:14.141852+00', NULL, NULL);

INSERT INTO "public"."user" ("address", "created_at", "notifications_enabled", "telegram") VALUES
	('0x32Be3435EFeD41E18c14dE8c628a38d989B7A4C', '2024-11-20 11:15:19.643812+00', false, NULL),
	('0x0b66fa29fe366194ea684ad3fa6b92e992316df5', '2024-11-25 00:28:43.318357+00', false, NULL),
	('0x51903a1964ec6b96f5eae3bbf1a5aa86e4a93294', '2024-11-25 01:14:35.016181+00', false, NULL),
	('0x6b483a5eae724305175a36cf29f9a31648914f43', '2024-11-25 21:37:22.317741+00', false, NULL),
	('0xc43249f63d5d84f704f4eaff087e2c40012e8ffb', '2024-11-25 16:59:48.230193+00', false, NULL),
	('0x5f95a3b2dcc0031fc124512cbcd65721ce5ecb96', '2024-11-26 15:01:03.018514+00', false, NULL);


INSERT INTO "public"."market_metric" ("market_id", "liquidity", "volume_24h", "volume_7d", "volume_30d", "open_interest", "num_traders", "fees_collected", "created_at", "updated_at") VALUES
	('0x2', 1000000.00, 50000.00, 350000.00, 1500000.00, 200000.00, 150, 2500.00, '2024-11-21 11:20:39.040929+00', '2024-11-21 11:20:39.040929+00'),
	('0x3', 1000000.00, 50000.00, 350000.00, 1500000.00, 200000.00, 150, 2500.00, '2024-11-21 11:21:14.491698+00', '2024-11-21 11:21:14.491698+00'),
	('0x4', 1000000.00, 50000.00, 350000.00, 1500000.00, 200000.00, 150, 2500.00, '2024-11-21 11:21:14.491698+00', '2024-11-21 11:21:14.491698+00'),
	('0x1', 1000000.00, 50000.00, 350000.00, 1500000.00, 200000.00, 150, 2500.00, '2024-11-21 11:21:14.491698+00', '2024-11-21 11:21:14.491698+00'),
	('0x99', 10000.68, 5000.85, 5000.61, 5000.64, 8795485, 35, 68463.64, '2024-11-26 11:13:52.395857+00', '2024-11-26 11:13:52.395857+00'),
	('0x5', 10000.68, 5000.85, 5000.61, 5000.64, 8795485, 35, 68463.64, '2024-11-26 11:13:52.395857+00', '2024-11-26 11:13:52.395857+00'),
	('0x6', 10000.68, 5000.85, 5000.61, 5000.64, 8795485, 35, 68463.64, '2024-11-26 11:13:52.395857+00', '2024-11-26 11:13:52.395857+00'),
	('0x7', 10000.68, 5000.85, 5000.61, 5000.64, 8795485, 35, 68463.64, '2024-11-26 11:13:52.395857+00', '2024-11-26 11:13:52.395857+00'),
	('0x8', 10000.68, 5000.85, 5000.61, 5000.64, 8795485, 35, 68463.64, '2024-11-26 11:13:52.395857+00', '2024-11-26 11:13:52.395857+00'),
	('0x9', 10000.68, 5000.85, 5000.61, 5000.64, 8795485, 35, 68463.64, '2024-11-26 11:13:52.395857+00', '2024-11-26 11:13:52.395857+00');


INSERT INTO "public"."user_market_collateral" ("id", "user_address", "balance", "updated_at", "market_id") OVERRIDING SYSTEM VALUE VALUES
	(5, '0x51903a1964ec6b96f5eae3bbf1a5aa86e4a93294', 1000, '2024-11-25 16:18:58.987241+00', '0x3'),
	(1, '0x51903a1964ec6b96f5eae3bbf1a5aa86e4a93294', 6000, '2024-11-25 03:04:24.669397+00', '0x1');

