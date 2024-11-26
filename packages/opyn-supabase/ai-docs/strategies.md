## What are the Opyn strategies? 
The Opyn strategies allow users to put their cryptos to work! Simply deposit USDC or ETH and the contracts do the rest.

On the back end, the contracts put on a strategy that earns users money when the market isn’t volatile. Think of it like a rollercoaster ride. If the ride is smooth and doesn't have too many ups and downs, then the Opyn strategies make money. But if the ride gets wild and goes all over the place, the strategies don't do so well. The goal is to make money when the ride is calm, not when it's wild!

Crab Strategy: 
Allow us to formally introduce you to the face of our winning USDC strategy–The Crab! The Crab Strategy is an automated strategy that allows users to stack USDC when the price of ETH moves less than the market expects.

But why a crab, you ask? Just like a crab moves steadily sideways, this strategy stacks USDC in stable market conditions.

The Crab works hard to safely protect your assets and ensures the strategy is 24/7 liquid with zero management fees!

Zen Bull Strategy:
Zen Bull is Opyn’s second strategy that allows Zen Bull is Opyn’s second strategy that accepts ETH deposits! The Bull works with the Crab to allow users to stack ETH more ETH. Zen Bull sources its returns from two places:

1. Crab Strategy
2. A long ETH position

You can think about Zen Bull as ETH with returns from Crab sprinkled on top ✨.

And just like Crab, Zen Bull is 24/7 liquid with zero management fees!

What impacts my profit in the Opyn Strategies? 
In general, the strategies earn returns except when there is high ETH volatility in the market, when they may draw downwards.

Most often, the strategies earn returns if ETH is within the below bands at the next hedge. 

Another way to think about the strategies is that they are profitable if the market moves less than what is expected.

## The Crab Strategy
The Crab Strategy is Opyn’s first automated strategy that allows users to stack USDC when the price of ETH moves less than the market expects.

The Crab Strategy is ideal for sideways market conditions (crabs move from side to side, get it?!). In other words, the ideal market is when the price of ETH fluctuates within a relatively stable range with periods of low volatility (the price of ETH is calm). 

Here’s how it works: Crab is built on top of an instrument called squeeth, which is a DeFi derivative that people pay to buy. Those premiums that people pay to buy squeeth go to Crabbers.

Returns
Opyn's Crab strategy leverages market expectations to profit from stable ETH prices. It aims to generate returns by betting against high volatility in the ETH market, in essence, profiting when the price of ETH moves less than expected.

On the back end, the strategies are utilizing Squeeth to help users stack ETH and USDC.

This is made possible because the people who buy Squeeth pay a premium and that premium goes to users in the Opyn Strategies.

Ideal Market Conditions
The Crab Strategy is ideal for sideways market conditions (crabs move from side to side, get it?!). In other words, the ideal market is when the price of ETH fluctuates within a relatively stable range with periods of low volatility (the price of ETH is calm). 

## Zen Bull (ETH)
The Zen Bull Strategy has been shut down due to the recent Euler Exploit.

What happens to the current Zen Bull strategy after the Euler exploit? 
The current Zen Bull strategy has been shut down. Please do not interact with the old zen bull contracts, only interact with the recovery contract. The Opyn frontend uses the recovery contract.

The Zen Bull Strategy
Zen Bull is an automated strategy that allows users to stack ETH when the price of ETH moves less than the market expects.

The strategy uses a combination of the Crab Strategy and a leveraged long ETH position to earn returns from stable (not volatile) ETH prices. ZB is a way for users to benefit from betting against high ETH price swings without losing ETH exposure. 

Zen Bull is unique because not only do depositors benefit from the price of ETH fluctuating within a relatively stable range, but they also benefit when the price of ETH goes up slowly. Both of these market moves allow you to stack more ETH over time.

Returns
Zen Bull is ideal for low volatility markets where the price of ETH trends upwards.

On the back end, Zen Bull uses the Crab Strategy to stack ETH. 

This is made possible because the people who buy Squeeth pay a premium and that premium goes to users in the Opyn Strategies.

Ideal Market Conditions
Zen Bull is ideal for low volatility markets where the price of ETH trends upwards. This is because Zen Bull uses the Crab strategy, which performs best when the price of ETH fluctuates within a relatively stable range. 