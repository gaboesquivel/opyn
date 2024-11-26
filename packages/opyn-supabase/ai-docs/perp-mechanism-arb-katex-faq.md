## What is the power perpetual (power perp) mechanism?

Power perpetuals (power perps) are derivatives that track a power of an asset's price continuously without an expiry date. They generalize perpetual swaps, providing exposure to various financial products, including futures and options, with continuous funding mechanisms. Power perps are classified by the power they track, such as 1-perp for futures and 2-perp for quadratic exposure. These contracts receive or pay regular funding based on the difference between the perp's mark price and the theoretical future price, simulating rolling contracts without expiration.

## What are the different types of power perpetuals?

Power perpetuals track different powers of the asset price, resulting in various use cases:

- **0-perp**: Tracks $S(t)^0 = 1$, making it equivalent to a stablecoin like DAI, with funding rate close to the interest rate $r$.
- **1-perp**: Tracks $S(t)^1$, representing futures contracts. Funding rates are similar to rolling expiring futures.
- **0.5-perp (Sqrth)**: Tracks the square root $S(t)^{1/2}$ of the price, and is ideal for hedging liquidity pool (LP) positions in AMMs like Uniswap.
- **2-perp (Squeeth)**: Tracks $S(t)^2$, useful as a hedge for options due to its quadratic exposure and similarity to rolling quadratic futures.

## How are power perpetuals priced?

Power perpetuals are priced similarly to options. For a power perp paying $S(T)^p$ at some future time $T$, the price at time $t$ is given by:

$$
F^p(t, T) = S(t)^p e^{(p-1)(r + \frac{p \sigma^2}{2} - pq)(T - t)}
$$

where:
- $S(t)$ is the current asset price,
- $p$ is the power,
- $r$ is the interest rate,
- $\sigma$ is the volatility,
- $q$ is the asset yield.

The pricing formula reflects the carry (cost or benefit of holding the position) over time.

## How does continuous in-kind funding work in power perpetuals?

Power perpetuals use continuous funding, similar to MakerDAO's perpetual contracts. The contract mints a unit of the perp, and the debt is calculated as $NF(t) \cdot S(t)^p$, where $NF(t)$ is a normalization factor that accumulates the funding cost. This debt can be repaid at any time by returning the perp or paying the debt value. If the collateral falls below a certain threshold, the contract liquidates to repay the debt.

The normalization factor is constructed as:

$$
NF(t) = \exp \left( \int_0^t c_p(t) dt \right)
$$

where $c_p(t)$ is the continuously compounded funding rate for the perp at time $t$. This ensures that the funding payments maintain the balance between long and short positions.

## How is the funding rate of power perpetuals calibrated?

The funding rate for a power perp $p$ is derived by adjusting for the market price, ensuring it aligns with the cost of carry. It can be expressed as:

$$
c_p(t) = -\frac{1}{f} \log \left( \frac{M_p(t) / NF(t)}{S(t)^p} \right)
$$

where:
- $M_p(t)$ is the current market price of the perp,
- $S(t)^p$ is the index price of the asset raised to power $p$,
- $f$ is the funding period.

If the perp trades above or below the index value, a funding payment is made, causing the market price to adjust accordingly. Arbitrage opportunities arise when the funding deviates from the correct rate, allowing traders to profit by trading against the fixed-expiry future.

## How do arbitrage opportunities work in power perpetuals?

Arbitrage opportunities in power perpetuals arise when the perp's market price deviates from the theoretical value implied by the fixed-expiry futures. For example, if the perp is underpriced, a trader can buy the perp and short the fixed-expiry future, making a profit as prices converge. Conversely, if the perp is overpriced, a trader can mint the perp, sell it, and buy the fixed-expiry future. These opportunities ensure the perp's price remains aligned with the futures market.

### Example: perp cheap arbitrage
- Asset price: $100
- 2-perp price: $10008$ (pricing 54% implied volatility)
- 1-day quadratic future price: $10009$ (pricing 57% implied volatility)

A trader buys the perp and shorts the future. After one day:
- New 2-perp price: $10000$
- New future price: $10000$

The trader loses $8$ on the perp but gains $9$ on the future, netting a profit of $1$.

## How are 2-perps used to hedge options?

A 2-perp (Squeeth) is ideal for hedging options because of its quadratic exposure, which aligns with the gamma risk (squared price changes) of an option. Options have three main risks:
- **Delta**: Sensitivity to price changes.
- **Gamma**: Sensitivity to squared price changes.
- **Vega**: Sensitivity to volatility changes.

A 2-perp hedges gamma risk, while futures hedge delta risk. By combining these instruments, traders can reduce the risk of holding options, improving liquidity and price discovery in the options market.

## How can 2-perps hedge Uniswap LP positions?

Uniswap LP positions exhibit risk that can be decomposed into delta (linear price changes) and gamma (squared price changes). A 2-perp is an effective hedge against gamma risk, often referred to as "impermanent loss." By hedging with a 2-perp, LPs can reduce their exposure to price fluctuations, improving liquidity provision. However, a 0.5-perp (Sqrth) is a more precise hedge for Uniswap LP positions, as it perfectly matches the risk profile of the LP token.
