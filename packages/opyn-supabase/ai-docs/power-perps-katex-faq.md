### What is a Power Perpetual?

A power perpetual is a derivative linked to a power of the price of an underlying asset, often ETH. If the underlying asset's price increases, the power perp's value increases at an accelerated rate. For example, if ETH doubles in price, an ETH² power perp increases by 4x. This asymmetric upside is balanced by a premium yield paid by those who are long to those who are short the perpetual.

### How do Power Perpetuals provide exposure?

Power perpetuals give options-like exposure without strikes or expiries. This means they consolidate options market liquidity into a single, more efficient instrument. The instrument requires regular premium payments to maintain long positions.

### What is the mechanism behind Power Perpetuals?

Power perpetuals use funding fees, often referred to as premium yields. Longs pay this fee to shorts based on the difference between the market price of the perpetual and the p-th power of the price of the underlying. For instance, in an ETH² perp, longs would pay $(\text{MARK} - \text{ETH}^2)$.

### How is the price of a Power Perpetual determined?

Pricing a power perpetual involves Black-Scholes assumptions and summing the value of a portfolio of expiring power derivatives. The price of a power perpetual for a power $p$ can be expressed as:

$$
S^p \frac {1} {2e^{-f \left(\frac{p - 1}{2}\right) (2r + pv^2)} - 1}
$$

Where $S$ is the spot price, $p$ is the power, $r$ is the risk-free rate, $v$ is the annualized volatility, and $f$ is the funding period in years.

### What happens if the price does not converge?

For certain combinations of high power and high volatility, the price of power perpetuals may fail to converge. The expression used to calculate the funding rate must satisfy:

$$
\frac{e^{f \left(\frac{p - 1}{2}\right) (2r + pv^2)}}{2} < 1
$$

Choosing a smaller funding period ensures the price converges and prevents infinitely valuable portfolios.

### Can you explain the ETH² Power Perpetual?

The ETH² power perp has a payoff based on the square of ETH's price. Under Black-Scholes assumptions, its price is given by:

$$
S^2 \frac{1}{2e^{-f(r + v^2)} - 1}
$$

If ETH quadruples in price, this power perpetual will 16x, offering constant gamma and optionality regardless of ETH's price. The term "squeeth" refers to this squared ETH power perp.

![ETH^2 Power Perp Payoff](https://research.opyn.co/_next/image?url=%2Fimages%2Fresearch%2F4%2F1.png&w=3840&q=75)

### How does the ETH³ Power Perpetual differ?

The ETH³ power perp is similar but responds to the cube of ETH's price. If ETH quadruples, the ETH³ perp will increase by 64x. Like other power perpetuals, it trades at a premium due to the embedded optionality.

![ETH^3 Power Perp Payoff](https://research.opyn.co/_next/image?url=%2Fimages%2Fresearch%2F4%2F2.png&w=3840&q=75)

### How are Power Perpetuals implemented in Python?

A Python implementation of power perpetual pricing is available [here](https://github.com/para-dave/powerperps/), along with tests to demonstrate the correctness of the pricing formulae.