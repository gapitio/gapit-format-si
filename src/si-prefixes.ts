const SI_PREFIXES = [
  { base10: 1e24, metricPrefix: "Y" },
  { base10: 1e21, metricPrefix: "Z" },
  { base10: 1e18, metricPrefix: "E" },
  { base10: 1e15, metricPrefix: "P" },
  { base10: 1e12, metricPrefix: "T" },
  { base10: 1e9, metricPrefix: "G" },
  { base10: 1e6, metricPrefix: "M" },
  { base10: 1e3, metricPrefix: "k" },
  { base10: 1, metricPrefix: "" },
  { base10: 1e-3, metricPrefix: "m" },
  { base10: 1e-6, metricPrefix: "µ" },
  { base10: 1e-9, metricPrefix: "n" },
  { base10: 1e-12, metricPrefix: "p" },
  { base10: 1e-15, metricPrefix: "f" },
  { base10: 1e-18, metricPrefix: "a" },
  { base10: 1e-21, metricPrefix: "z" },
  { base10: 1e-24, metricPrefix: "y", last: true },
];

export { SI_PREFIXES };
