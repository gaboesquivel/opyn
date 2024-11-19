/**
 * Returns the absolute value of a bigint
 * @param x The input bigint
 * @returns The absolute value
 */
export function abs(x: bigint): bigint {
  return x < 0n ? -x : x
}

/**
 * Returns the sign of a bigint (-1, 0, or 1)
 * @param x The input bigint
 * @returns -1n if negative, 0n if zero, 1n if positive
 */
export function sign(x: bigint): bigint {
  if (x === 0n) return 0n
  return x < 0n ? -1n : 1n
}

/**
 * Raises a bigint base to a bigint exponent
 * @param base The base number
 * @param exponent The exponent to raise the base to
 * @returns base raised to exponent
 */
export function pow(base: bigint, exponent: bigint): bigint {
  return base ** exponent
}

/**
 * Returns the minimum value from a list of bigints
 * @param value The first value to compare
 * @param values Additional values to compare
 * @returns The smallest bigint from the inputs
 */
export function min(value: bigint, ...values: bigint[]): bigint {
  let result = value
  for (const v of values) if (v < result) result = v
  return result
}

/**
 * Returns the maximum value from a list of bigints
 * @param value The first value to compare
 * @param values Additional values to compare
 * @returns The largest bigint from the inputs
 */
export function max(value: bigint, ...values: bigint[]): bigint {
  let result = value
  for (const v of values) if (v > result) result = v
  return result
}

/**
 * Collection of bigint math utility functions
 */
export const bigMath = {
  abs,
  sign,
  pow,
  min,
  max,
}
