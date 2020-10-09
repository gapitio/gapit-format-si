import { SI_PREFIXES } from "./si-prefixes";

/**
 * Formats number into SI metric prefixes.
 *
 * @example
 *
 * ```ts
 * formatNumber(10000); // Returns {value: 10, metricPrefix: "k"}
 * ```
 *
 * @param {number} num - Number to be formatted.
 * @return {object} object containing value and metricPrefix.
 */
function formatNumber(
  num: number
): {
  value: number;
  metricPrefix: string;
} {
  for (const { base10, metricPrefix } of SI_PREFIXES) {
    if (Math.abs(num) >= base10) {
      return {
        value: num / base10,
        metricPrefix: metricPrefix,
      };
    }
  }

  /*
    Value is less than the last value in SI_PREFIXES (y: 1e-24),
    but still return the value as the lowest prefix.
  */
  const [{ base10, metricPrefix }] = SI_PREFIXES.slice(-1);
  return {
    value: num / base10,
    metricPrefix: metricPrefix,
  };
}

/**
 * Formats num into SI metric prefixes.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Metric_prefix.
 *
 * @example
 *
 * ```ts
 * formatSI(10000, "W"); // Returns {value: 10, metricPrefix: "kW"}
 * ```
 *
 * @param {(string | number)} num - Number to be formatted.
 * @param {string} baseUnit - The unit that will be formatted to contain a metricPrefix ("kW", "MV", ETC).
 * @return {object} object containing value and unit.
 */
function formatSI(
  num: string | number,
  baseUnit: string
): {
  value: number | null;
  unit: string;
} {
  // Don't format when the value is 0.
  if ([0, "0", "-0"].includes(num)) {
    return { value: 0, unit: baseUnit };
  }
  // num needs to be a valid number.
  else if (
    !["string", "number"].includes(typeof num) ||
    isNaN(Number(num)) ||
    !num
  ) {
    return { value: null, unit: "" };
  }

  const { value, metricPrefix } = formatNumber(Number(num));

  return { value, unit: metricPrefix + baseUnit };
}

/**
 * Formats num into SI metric prefixes,
 * and applies .toFixed(baseUnit) to it.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Metric_prefix.
 *
 * @example
 *
 * ```ts
 * formatFixedSI(10000, "W", 3); // Returns {value: "10.000", metricPrefix: "kW"}
 * ```
 *
 * @param {(string | number)} num - Number to be formatted.
 * @param {number} fractionDigits - Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
 * @param {string} baseUnit - The unit that will be formatted to contain a metricPrefix ("kW", "MV", ETC).
 * @param {string} exponentialFractionDigits - Fraction digits for when the value is more than 1000 Y or below -1000 y.
 * Number of digits after the decimal point for exponential notation. Must be in the range 0 - 20, inclusive.
 * @return {object} object containing value and unit.
 */
function formatFixedSI(
  num: string | number,
  baseUnit: string,
  fractionDigits: number,
  exponentialFractionDigits = 1
): {
  value: string | null;
  unit: string;
} {
  const { value, unit } = formatSI(num, baseUnit);

  if (value == null) return { value: null, unit };
  if (value > 1000 || value < -1000)
    return { value: value.toExponential(exponentialFractionDigits), unit };

  return { value: value.toFixed(fractionDigits), unit };
}

/**
 * Formats num into SI metric prefixes,
 * and applies .toPrecision(precision) to it.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Metric_prefix.
 *
 * @example
 *
 * ```ts
 * formatPrecisionSI(10000, "W", 3); // Returns {value: "10.0", metricPrefix: "kW"}
 * ```
 *
 * @param {(string | number)} num - Number to be formatted.
 * @param {number} precision - Number of significant digits. Must be in the range 1 - 21, inclusive.
 * @param {string} baseUnit - The unit that will be formatted to contain a metricPrefix ("kW", "MV", ETC).
 * @param {string} exponentialFractionDigits - Fraction digits for when the value is more than 1000 Y or below -1000 y.
 * Number of digits after the decimal point for exponential notation. Must be in the range 0 - 20, inclusive.
 * @return {object} object containing value and unit.
 */
function formatPrecisionSI(
  num: string | number,
  baseUnit: string,
  precision: number,
  exponentialFractionDigits = 1
): {
  value: string | null;
  unit: string;
} {
  const { value, unit } = formatSI(num, baseUnit);

  if (value == null) return { value: null, unit };
  if (value > 1000 || value < -1000)
    return { value: value.toExponential(exponentialFractionDigits), unit };

  return { value: value.toPrecision(precision), unit };
}

export { formatSI, formatFixedSI, formatPrecisionSI, SI_PREFIXES };
