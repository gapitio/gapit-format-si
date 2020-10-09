# Format SI

Format a number into [SI metric prefixed value](https://en.wikipedia.org/wiki/Metric_prefix).

## Usage

There are three different functions that converts a value into SI metric prefixed value.

### formatSI()

Converts a number into the metric prefixed value.

Example:

```ts
formatSI(10000, "W"); // Returns { value: 10, unit: "kW" }
```

### formatFixedSI()

Uses [formatSI()](#format-si) to convert the number, but it adds [.toFixed(fractionDigits)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) to the value.

Example:

```ts
formatFixedSI(10000 "W", 3,); // Returns { value: "10.000", unit: "kW" }
```

### formatPrecisionSI()

Uses [formatSI()](#format-si) to convert the number, but it adds [.toPrecision(precision)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Number/toPrecision) to the value.

Example:

```ts
formatPrecisionSI(10000 "W", 3,); // Returns { value: "10.0", unit: "kW" }
```
