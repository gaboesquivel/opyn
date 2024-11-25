### What is a power perpetual?

A perpetual is a contract that tracks and provides exposure to an index, exchanging regular payments based on the difference between the traded (mark) price and the target index price. A power perpetual extends this by taking the price to a power, so the contract is based on $(\text{index price})^p$, where $p$ is the power.

### How does a power perpetual short position work?

To create a short position in a power perpetual contract, you lock collateral in a vault and mint (borrow) the power perpetual. You then sell the minted perp to go short. The collateral ratio, given by:

$$
\text{Collateral ratio} = \frac{(\text{collateral quantity}) \times (\text{collateral price})}{(\text{perpetual quantity}) \times (\text{index asset price})^p}
$$

must stay safely above one to avoid liquidation.

### What are the three claims made about perps?

1. **Stablecoins are 0-perps:** Stablecoins can be thought of as a loan against collateral, with a power of 0. This corresponds to minting tokens with collateralized assets, where the funding mechanism helps maintain a stable price peg.
   
2. **Margined futures are 1-perps:** Futures are essentially perps with a power of 1. The price is proportional to the underlying asset, and funding ensures that the perp price tracks the asset price closely.
   
3. **Constant product AMMs are like 0.5-perps:** Uniswap's value for liquidity providers is proportional to the square root of the asset prices. This mirrors the behavior of a perp with a power of 0.5, where funding offsets trading fees.

### How does the 0-perp structure apply to stablecoins?

Stablecoins, such as DAI or RAI, are effectively 0-perps. For example, consider a stablecoin minted with ETH collateral:

$$
\text{Collateral ratio} = \frac{(1 \text{ ETH}) \times (3,000)}{2,000 \times 1} = 1.5
$$

Here, the collateral ratio is set based on the collateral asset (ETH) and the power of the index (0). Funding is the difference between the market price of the stablecoin and the index price, ensuring that stablecoins trade close to $1.

### How are margined futures like 1-perps?

In a margined future with power 1, the perp price tracks the price of the index asset, such as ETH/USD. For instance, if you mint stableETH with a collateral ratio of 1.5:

$$
\text{Collateral ratio} = \frac{4,500 \times 1}{1 \times 3,000} = 1.5
$$

This allows for price arbitrage to ensure that the perp price stays close to the underlying asset.

### How does Uniswap behave like a 0.5-perp?

Uniswap pools follow a constant product formula, where the value of an LP position depends on the square root of the price of the assets:

$$
V = 2 \times (k \times (\text{eth price}))^{0.5}
$$

This mirrors a perp with power 0.5. In this case, the funding rate reflects expected Uniswap fees and balances the price risk between the perpetual and the liquidity pool.

### How does leverage work in margined perps?

By selling minted perps and reinvesting the proceeds, you can leverage a position. For example, with a collateral ratio of 1.5 and flash loans, you can sell perps, deposit the proceeds as collateral, and mint more perps. This process can be repeated, creating a leveraged short or long position.

### What is the relationship between perps and AMMs?

Both AMMs and perps can be understood as variants of power perpetuals. AMMs like Uniswap track prices similarly to perps with fractional powers, while more traditional futures and stablecoins correspond to powers of 1 and 0, respectively.

### How do higher-order power perps work?

Higher-order perps, such as Squeeth (quadratic perps), provide exposure to higher powers of the index price. This allows for more precise payoffs and can be used in combination with 1-perps and 0-perps to approximate complex functions such as $\sin(x)$, $e^{x^2}$, $\log(x)$, and others.

![Comparative Analysis: Payoff structures for various Power Perpetuals](https://research.opyn.co/_next/image?url=%2Fimages%2Fresearch%2F1%2F3.png&w=3840&q=75)

### What are the key components of a power perpetual?

Power perpetuals consist of three key components:

1. **Collateral asset:** The asset posted as collateral (e.g., ETH, USD).
2. **Index asset:** The asset whose value is being tokenized (e.g., ETH).
3. **Numeraire asset:** The unit in which the value is measured (e.g., USD).
4. **Power $p$:** The exponent applied to the index price, defining how the perp tracks the index price.

### How do power perpetuals differ by power $p$?

| **Perpetual Type**        | **Power $p$** | **Collateral Asset** | **Index Asset** | **Numeraire Asset** | **Payoff**                                  |
|---------------------------|----------------|----------------------|-----------------|---------------------|---------------------------------------------|
| **Stablecoin (DAI, RAI)**  | 0              | ETH                  | ETH             | USD                 | $\text{constant value}$                    |
| **Margined Futures**       | 1              | USD                  | ETH             | USD                 | $\text{linear with ETH price}$             |
| **Constant Product AMMs**  | 0.5            | USD                  | ETH             | USD                 | $\sqrt{\text{ETH price}}$                  |
| **Squeeth**                | 2              | ETH                  | ETH             | USD                 | $\text{quadratic with ETH price}$          |

### How do stablecoins (0-perps) maintain their peg to $1?

Stablecoins use a collateralized structure to maintain a price peg. The price stability is enforced through a funding mechanism, which adjusts based on the difference between the market price (mark) and the index price (target price of $1). If the stablecoin trades above or below $1, arbitrageurs step in to restore the peg by minting or buying stablecoins.

| **Mechanism**                   | **Above $1**                                    | **Below $1**                                     |
|----------------------------------|-------------------------------------------------|--------------------------------------------------|
| **Arbitrage Opportunity**        | Mint and sell stablecoins for profit            | Buy stablecoins to earn interest and sell later   |
| **Funding Mechanism**            | Mark - Index = Mark - 1                         | Mark - Index = Mark - 1                          |

### How are margined futures (1-perps) structured?

Margined futures are power perpetuals with $p = 1$, meaning they track the index price linearly. The funding mechanism ensures that the perp price stays close to the actual price of the underlying asset, such as ETH.

| **Power**    | 1 |
|--------------|---|
| **Collateral**| USD |
| **Index**     | ETH |
| **Numeraire** | USD |
| **Funding**   | $\text{Mark price} - \text{Index price}$ |

### How can a liquidity provider position in Uniswap be modeled as a 0.5-perp?

Uniswap's constant product formula results in a value proportional to the square root of the relative prices of the two assets. This mirrors a 0.5-perp, where the payoff tracks the square root of the index price. 

| **Perp Type**                | **Uniswap Pool**         |
|------------------------------|--------------------------|
| **Power $p$**                | 0.5                      |
| **Index Asset**               | ETH                      |
| **Collateral Asset**          | USD                      |
| **Numeraire**                 | USD                      |
| **Payoff**                    | $V = 2 \times (k \times (\text{eth price}))^{0.5}$ |

### What are higher-order power perpetuals?

Higher-order power perpetuals involve powers greater than 1, such as Squeeth, which provides exposure to the quadratic component of price risk. These can be combined with other perps (0-perps, 1-perps) to approximate more complex financial payoffs.

| **Perp Type**          | **Power $p$** | **Example**           | **Payoff**                            |
|------------------------|----------------|-----------------------|---------------------------------------|
| **Linear Perp**         | 1              | Margined Futures       | $\text{Price of ETH}$                 |
| **Quadratic Perp**      | 2              | Squeeth                | $\text{Price of ETH}^2$               |
| **Custom Perps**        | $n$            | Higher-order payoffs   | Can approximate functions like $\sin(x)$, $\log(x)$ |


### How do stablecoins (0-perps) differ from margined futures (1-perps)?

Stablecoins and margined futures represent two extremes of power perpetuals, with different structures and use cases. 

| **Feature**                        | **Stablecoins (0-perps)**                                           | **Margined Futures (1-perps)**                                   |
|------------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------|
| **Power $p$**                      | 0                                                                 | 1                                                                |
| **Collateral Asset**               | ETH                                                               | USD                                                              |
| **Index Asset**                    | ETH                                                               | ETH                                                              |
| **Numeraire Asset**                | USD                                                               | USD                                                              |
| **Payoff Structure**               | Constant (no sensitivity to index price)                          | Linear sensitivity to index price                                |
| **Funding Formula**                | $\text{Funding} = \text{Mark} - 1$                                | $\text{Funding} = \text{Mark price} - \text{Index price}$        |
| **Use Case**                       | Price stability, pegged to $1                                     | Tracking ETH price movements, with short/long leverage options   |

### How do Uniswap pools compare to traditional perps?

Uniswap's constant product formula makes its liquidity pools behave similarly to fractional power perps. The LP position is equivalent to a 0.5-perp, as its payoff scales with the square root of the asset prices.

| **Feature**                     | **Uniswap Pool (0.5-perp)**                                         | **Traditional Perp (1-perp)**                                    |
|----------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------|
| **Power $p$**                    | 0.5                                                               | 1                                                                |
| **Payoff Structure**             | $\sqrt{\text{Price}}$                                              | Linear with respect to price                                     |
| **Collateral Asset**             | USD                                                               | USD                                                              |
| **Index Asset**                  | ETH                                                               | ETH                                                              |
| **Numeraire Asset**              | USD                                                               | USD                                                              |
| **Use Case**                     | Liquidity provision with exposure to asset price                   | Leverage or hedge exposure to ETH price movements                 |

### How do different power levels $p$ impact the payoff of a perp?

The power $p$ in a perpetual defines how the contract tracks the underlying index price, impacting the risk profile and potential payoff.

| **Power $p$**   | **Description**                               | **Example**                | **Payoff**                               |
|---------------------|-----------------------------------------------|----------------------------|------------------------------------------|
| 0                   | No sensitivity to index price                 | Stablecoins (DAI, RAI)      | $\text{Constant}$                        |
| 0.5                 | Square root sensitivity to index price        | Uniswap LP                 | $\sqrt{\text{Price}}$                    |
| 1                   | Linear sensitivity to index price             | Margined Futures           | $\text{Price}$                           |
| 2                   | Quadratic sensitivity to index price          | Squeeth                    | $\text{Price}^2$                         |

### How does leverage work in power perpetuals?

Leverage in power perpetuals can be achieved by recursively minting and selling the perpetual. For instance, in a 1-perp (margined futures), selling the minted perp and using the proceeds as collateral allows for increased exposure with less initial capital.

| **Leverage Process**                                                 | **Example**                                  | **Effect**                                                |
|----------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------|
| **Step 1**: Deposit collateral (e.g., $4,500)                        | Mint 1 stableETH                             | Initial exposure = 1 ETH                                  |
| **Step 2**: Sell stableETH, deposit proceeds, and mint more perps    | Sell for $3,000, deposit, mint 0.666 stableETH| Increased exposure = 1.666 ETH                            |
| **Step 3**: Repeat process with proceeds                             | Sell for $2,000, mint more perps             | Final exposure ≈ 2x leverage with $4,500 initial collateral|

### How do AMMs compare to power perps?

AMMs like Uniswap replicate the behavior of power perpetuals with fractional power. Their liquidity positions scale with the square root of the asset prices, while power perps track price with varying powers $p$.

| **Feature**                     | **AMMs (0.5-perp)**                                                  | **Power Perps (general)**                                          |
|----------------------------------|----------------------------------------------------------------------|--------------------------------------------------------------------|
| **Price Sensitivity**            | Square root of the asset price                                        | Defined by the power $p$, e.g., $\text{Price}^p$                   |
| **Collateral**                   | Liquidity in a pool (e.g., ETH, USD)                                 | Specific collateral (e.g., ETH, USD)                               |
| **Payoff**                       | $\sqrt{\text{Price}}$                                                 | Varies with $p$: linear, quadratic, etc.                           |
| **Use Case**                     | Earning trading fees while providing liquidity                        | Trading, hedging, and speculation on the price of an asset          |

### What's the role of funding in power perps?

Funding ensures that the price of the perpetual stays close to the target index price. The funding payment is adjusted based on the difference between the perp price and the target index price. In a 1-perp, this means paying or receiving funding depending on whether the perp is trading above or below the underlying asset price.

| **Feature**                  | **Stablecoins (0-perps)**                                  | **Margined Futures (1-perps)**                             |
|------------------------------|------------------------------------------------------------|------------------------------------------------------------|
| **Funding Payment**           | $\text{Mark} - 1$                                          | $\text{Mark price} - \text{Index price}$                   |
| **Incentives**                | Keeps stablecoin close to $1                               | Keeps perp close to underlying asset price                 |
| **Effect**                    | Arbitrage to mint/sell or buy/redeem stablecoin            | Arbitrage to short/long the perp based on asset price       |

### Comparative Table: Power Perpetuals, AMMs, and Stablecoins

| **Product**                     | **Collateral**     | **Index Asset**     | **Numeraire Asset** | **Power $p$** | **Payoff**                               |
|----------------------------------|--------------------|---------------------|---------------------|----------------|------------------------------------------|
| **Stablecoin (DAI, RAI)**        | ETH                | ETH                 | USD                 | 0              | Constant (pegged to $1)                  |
| **Margined Future**              | USD                | ETH                 | USD                 | 1              | Linear with ETH price                    |
| **Uniswap LP**                   | USD, ETH           | ETH                 | USD                 | 0.5            | Square root of ETH price                 |
| **Squeeth**                      | ETH                | ETH                 | USD                 | 2              | Quadratic with ETH price                 |