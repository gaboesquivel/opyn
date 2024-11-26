## What are power perpetuals?

Power perpetuals are a type of derivative that pay a power of an asset's price without an expiry date, trading similarly to perpetual contracts but based on the power of the price. They can be thought of as perpetual versions of power futures, where the price is continuously updated through a funding mechanism. The valuation of these contracts is derived from a sequence of fixed-expiry power futures priced at regular funding intervals, approaching the price of a single fixed-expiry contract over time if volatility and funding are flat.

## How do power perpetuals relate to power futures?

Power perpetuals are continuous versions of power futures, which pay the power of an asset's price at expiry. For example, a 2-perpetual would pay the square of the asset's price. While power futures have a fixed expiration date, power perpetuals stay active indefinitely through regular funding payments, allowing for continuous price adjustments. The funding process causes perpetual contracts to mimic a series of short-dated futures as each funding period passes.

## What is the role of the funding mechanism in power perpetuals?

The funding mechanism in power perpetuals adjusts the contract's price regularly to keep it aligned with the asset's performance. At each funding interval, a payment is made between long and short holders based on the difference between the contract's mark price and its payout at the funding period. This payment incentivizes the contract to follow the target (index) price over time. The funding ensures that power perpetuals remain closely linked to the asset's actual value, similar to how rolling short-term futures track an underlying asset.

## How are power perpetuals priced under the Black-Scholes framework?

Power perpetuals can be priced using a variation of the Black-Scholes model. Under the risk-neutral measure, the distribution of the asset price $S_T$ at time $T$ is assumed to follow a log-normal distribution. The price of a power perpetual can be expressed as:

$$
V^p(t, T) = S_t^p e^{(p-1) \left(r + \frac{p \sigma^2}{2}\right) \tau}
$$

where:
- $S_t$ is the current asset price,
- $p$ is the power of the contract (e.g., 2 for a 2-perpetual),
- $r$ is the risk-free rate,
- $\sigma$ is the volatility,
- $\tau = T - t$ is the time to funding.

For perpetual contracts, the continuous funding mechanism ensures that the value approximates a series of power futures priced at the funding intervals.

## What is the martingale condition in power perpetual pricing?

The martingale condition ensures that the price process under the risk-neutral measure is arbitrage-free. For power perpetuals, the condition is that the ratio of the price of the derivative and a numeraire (such as the underlying asset or a risk-free bond) must have no drift. This is formally written as:

$$
E^* \left( \frac{D(T,T)}{N_T} \middle| S_t \right) = \frac{D(t,T)}{N_t}
$$

This equation states that the expected value of the derivative divided by the numeraire remains constant, ensuring that the contract's price is properly discounted for risk.

## How does frequent compounding affect power perpetuals?

Frequent compounding in power perpetuals leads to prices that closely mimic fixed-expiry futures. As the number of funding periods $N$ increases, the price of a power perpetual converges to that of a fixed-expiry power future that expires at each funding period. This happens because the frequent funding payments act similarly to the carry in a future contract. The ratio of the power future price to the perpetual price is:

$$
\frac{V^p(t,T)}{V_\infty(t)} = e^k \left( (N+1) e^{-k/N} - N \right)
$$

For high volatility and short funding periods, the perpetual price is very close to that of a fixed-expiry power future.

## How can we replicate the payoff of a power perpetual?

The payoff of a power perpetual can be replicated by decomposing it into simpler financial instruments, such as zero-coupon bonds, forwards, and options. Using a Taylor series expansion, the payoff of a power perpetual can be expressed as a weighted sum of simpler derivatives:

$$
f(S_t) = \sum_{n=0}^{\infty} \frac{f^{(n)}(S_t)}{n!} (\Delta S)^n
$$

This allows us to approximate the perpetual's exposure to different orders of price movements (delta, gamma, etc.) by constructing a portfolio of lower-order power perpetuals or options.

## How can 2-perpetuals be used to hedge options?

A 2-perpetual has a payoff that depends on the square of the asset price changes. To hedge the gamma (second-order sensitivity to price changes) of an option, we can use a 2-perpetual. The notional size of the perpetual needed to hedge the option is:

$$
-\frac{1}{2} \frac{\partial^2 f}{\partial S^2}
$$

Additionally, to hedge the option's delta (first-order sensitivity to price changes), we need to adjust the position in both the 1-perpetual and the 2-perpetual. The notional size of the 1-perpetual is:

$$
- \left( \frac{1}{2} \frac{\partial^2 f}{\partial S^2} 2 S_t + \frac{\partial f}{\partial S} \right)
$$

By holding these perpetuals, we can effectively hedge the option's exposure to both price movements and changes in volatility.

## How is the price of a delta-hedged 2-perpetual calculated?

The payoff of a delta-hedged 2-perpetual is proportional to the squared price change $(\Delta S)^2$, excluding funding costs. The return for holding this position on an asset with price $S_t^2$ is:

$$
\frac{(\Delta S)^2}{S_t^2} = r_t^2
$$

The total payoff over a period $\Delta t$ is adjusted for the funding cost and vega (sensitivity to volatility changes):

$$
r_t^2 - f_t \Delta t + 2 T \sigma_t \Delta \sigma
$$

This is similar to a variance swap, where the return is based on the squared returns of the underlying asset.