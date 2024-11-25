### What is a variance swap?

A variance swap is an exchange of future price variance for a fixed swap rate. The payoff over a time interval $[0,T]$ is:

$$
V_T = N_{\text{var}} \left( s^2_{[0,T]} - K^2 \right)
$$

where:

- $N_{\text{var}}$ = variance notional
- $s^2_{[0,T]}$ = measured variance over $[0,T]$
- $K$ = strike in volatility units

Variance is measured from $n+1$ observations of the price $S_{t_0}, S_{t_1}, \ldots, S_{t_n}$ with:

$$
s^2_{[0,T]} = 100^2 \frac{A}{D} \sum_{i=1}^{N} r_i^2
$$

where $A$ is the number of observation periods in a year, $r_i = \ln \left( \frac{S_{t_i}}{S_{t_{i-1}}} \right)$, and the swap length is $T = \frac{D}{A}$.

### What are the Greeks of a variance swap?

At time $t_0$, the Greeks are:

- **Vega**: 
  $$
  \frac{\partial V_{t_0}}{\partial K} = N_{\text{var}} \cdot 2K
  $$

- **Intraday Delta**: 
  $$
  \frac{\partial V_{t_0}}{\partial S_t} = N_{\text{var}} \cdot \frac{A}{D} \cdot 2 \left( \frac{\ln S_t - \ln S_{t_0}}{S_t} \right) \cdot 100^2
  $$

- **Intraday Gamma**: 
  $$
  \frac{\partial^2 V_{t_0}}{(\partial S_t)^2} = N_{\text{var}} \cdot \frac{A}{D} \cdot 2 \left( \frac{1 + \ln \frac{S_t}{S_0}}{S_t^2} \right) \cdot 100^2
  $$

### What is a variance perpetual?

A variance perpetual generalizes a variance swap by removing the fixed period. It's constructed using a quadratic perpetual and a short delta hedge rebalanced at each observation period. The perpetual price $M_t$ determines the net funding based on the difference between $M_t$ and the squared underlying price:

$$
f_t = M_t - S_t^2
$$

The PnL approximation over $[0, \Delta t]$ is:

$$
N_{\text{varp}} \left( \tilde{r_t}^2 - f_t \frac{\Delta t}{\tau} - 2\sigma_t \tau \Delta \sigma \right)
$$

where $\tilde{r_t} = \frac{S_t}{S_0} - 1$, $\sigma_t$ is implied volatility, $\tau$ is the funding period, and $N_{\text{varp}}$ is the notional of the quadratic perpetual.

### What are the Greeks of a variance perpetual?

At time $t_0$, the Greeks are:

- **Vega**: 
  $$
  \frac{\partial V_{t_0}}{\partial K} = N_{\text{varp}} \cdot 2 \sigma_t \cdot \frac{\tau}{100}
  $$

- **Intraday Delta**: 
  $$
  \frac{\partial V_{t_0}}{\partial S_t} = N_{\text{varp}} \left( \frac{2 S_t}{S_{t_0}^2} - \frac{2}{S_{t_0}} \right)
  $$

- **Intraday Gamma**: 
  $$
  \frac{\partial^2 V_{t_0}}{(\partial S_t)^2} = N_{\text{varp}} \cdot \frac{2}{S_{t_0}^2}
  $$

### How does a variance perpetual differ from a variance swap?

Key differences between a variance perpetual and a standard variance swap:

- **Gamma**: Constant over the hedging interval $[t_{i-1}, t_i]$.
- **Vega**: Proportional to implied volatility and does not decay to zero, unlike the fixed-expiry swap.
- **Skew sensitivity**: The variance perpetual is less sensitive to skew, as its replicating portfolio has a lower weighting to OTM puts.

### Example of variance swap vs. perpetual swap

Consider a 30-day variance swap with:

- $D = 30$ observation days
- $K = 20$ volatility strike
- $N_{\text{vega}} = 100$
- $A = 365$ (annualization factor)

The variance notional is:

$$
N_{\text{var}} = \frac{N_{\text{vega}}}{2K} = 2.5
$$

To match gamma and delta for a variance perpetual with the same funding period:

$$
N_{\text{varp}} = N_{\text{var}} \cdot \frac{A}{D} \cdot 100^2 = 304166.66
$$

If the quadratic perpetual prices at 20% implied volatility, the variance swap vega matches as:

$$
\text{Vega}_{\text{varp}} = 304166.66 \cdot 2 \cdot 0.2 \cdot \frac{30}{365} = 100
$$

### Replicating portfolios for variance swap and variance perpetual

- **Variance swap portfolio**: 
  $$
  \omega(K) = \frac{2 dK}{K^2}
  $$
- **Quadratic perpetual portfolio**: 
  $$
  \tilde{\omega}(K) = \frac{2 dK}{S_0^2}
  $$

Variance swaps are more sensitive to skew due to higher weighting towards low strike options.

### What are the two approaches to implementing variance perpetuals?

1. **Direct implementation**: Short a quadratic perpetual, collateralized with the underlying asset for delta neutrality, with regular rebalancing.
2. **Alternative method**: Hold a fixed quantity of the quadratic perpetual and rebalance with a linear perpetual, requiring less trading of the quadratic.



## What is the approximate PnL for a variance perpetual?

The approximate PnL over $[0, \Delta t]$ from a Taylor expansion is:

$$N_{\text{varp}}(\tilde{r}_t^2 - f_t\frac{\Delta t}{\tau} - 2\sigma_t\tau\Delta\sigma)$$

Where:
- $N_{\text{varp}}$ = notional amount of the quadratic perpetual
- $\sigma_t$ = implied volatility of the quadratic perpetual
- $\tau$ = funding period
- $\tilde{r}_t = (S_t/S_0) - 1$ is the simple price return

## How does the variance perpetual differ from a standard variance swap?

- Gamma is constant over the hedging interval $[t_{i-1}, t_i]$.
- Vega remains proportional to implied volatility (it decays in a standard variance swap).
- The variance perpetual has a different ratio of vega to gamma as time progresses.
- It is less affected by skew due to the lower weighting of OTM puts in the replicating portfolio.

![Variance Swap Return vs Variance Perpetual Return](https://research.opyn.co/_next/image?url=%2Fimages%2Fresearch%2F5%2F1.png&w=3840&q=75)

## What is an example of a 30-day variance swap vs. a perpetual swap?

For a variance swap with:
- Observation days: $D = 30$
- Volatility strike: $K = 20$
- Notional vega: $N_{\text{vega}} = 100$
- Annualization: $A = 365$

The variance notional is $N_{\text{var}} = N_{\text{vega}} / (2K) = 2.5$.

The notional for the perpetual swap is:

$$N_{\text{varp}} = N_{\text{var}} \cdot \frac{A}{D} \cdot 100^2 = 304166.66$$

With a 20% implied volatility and a 30-day funding period, the perpetual swap vega is:

$$\text{Vega}_{\text{varp}} = 304166.66 \cdot 2 \cdot 0.2 \cdot \frac{30}{365} = 100$$

The variance swap and variance perpetual are matched for gamma and delta at the current price.

![Variance Swap and Perp Delta](https://research.opyn.co/_next/image?url=%2Fimages%2Fresearch%2F5%2F2.png&w=3840&q=75)

![Variance Swap and Perp Gamma](https://research.opyn.co/_next/image?url=%2Fimages%2Fresearch%2F5%2F3.png&w=3840&q=75)

![Variance Swap vs Variance Perpetual](https://research.opyn.co/_next/image?url=%2Fimages%2Fresearch%2F5%2F5.png&w=3840&q=75)

![Variance Swap PnL](https://research.opyn.co/_next/image?url=%2Fimages%2Fresearch%2F5%2F6.png&w=3840&q=75)

## What is the replicating portfolio for a variance swap?

The replicating portfolio for a variance swap is:

$$\omega(K) = \frac{2dK}{K^2}$$

## What is the replicating portfolio for a quadratic perpetual?

The replicating portfolio for a quadratic perpetual with the same gamma is:

$$\tilde{\omega}(K) = \frac{2dK}{S_0^2}$$

