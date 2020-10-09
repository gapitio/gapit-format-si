import {
  formatSI,
  formatFixedSI,
  formatPrecisionSI,
  SI_PREFIXES,
} from "../src/index";

describe("SI prefixes", () => {
  it("contains a last key that's true", () => {
    expect(
      SI_PREFIXES.filter((siPrefix) => siPrefix.last === true).length === 1
    ).toBeTruthy();
  });
});

describe("formats to SI metric prefix", () => {
  describe("positive numbers", () => {
    it("formats numbers", () => {
      expect(formatSI(1, "VA")).toMatchObject({
        value: 1,
        unit: "VA",
      });
      expect(formatSI(1.2, "W")).toMatchObject({
        value: 1.2,
        unit: "W",
      });
      expect(formatSI(1e3, "W")).toMatchObject({
        value: 1,
        unit: "kW",
      });
      expect(formatSI(123456789, "W")).toMatchObject({
        value: 123.456789,
        unit: "MW",
      });
    });

    it("formats string numbers", () => {
      expect(formatSI("1", "VA")).toMatchObject({
        value: 1,
        unit: "VA",
      });
      expect(formatSI("123456789", "W")).toMatchObject({
        value: 123.456789,
        unit: "MW",
      });
    });

    it("formats decimal numbers", () => {
      expect(formatSI(0.00000001, "W")).toMatchObject({
        value: 10.0,
        unit: "nW",
      });
      expect(formatSI(0.125123, "W")).toMatchObject({
        value: 125.123,
        unit: "mW",
      });
      expect(formatSI(1e-25, "W")).toMatchObject({
        value: 0.1,
        unit: "yW",
      });
      expect(formatSI(1e-51, "W")).toMatchObject({
        value: 1e-27,
        unit: "yW",
      });
    });
  });

  describe("negative numbers", () => {
    it("formats numbers", () => {
      expect(formatSI(-1, "VA")).toMatchObject({
        value: -1.0,
        unit: "VA",
      });
      expect(formatSI(-1.2, "W")).toMatchObject({
        value: -1.2,
        unit: "W",
      });
      expect(formatSI(-1e3, "W")).toMatchObject({
        value: -1.0,
        unit: "kW",
      });
      expect(formatSI(-123456789, "W")).toMatchObject({
        value: -123.456789,
        unit: "MW",
      });
    });

    it("formats string numbers", () => {
      expect(formatSI("-1", "VA")).toMatchObject({
        value: -1,
        unit: "VA",
      });
      expect(formatSI("-123456789", "W")).toMatchObject({
        value: -123.456789,
        unit: "MW",
      });
    });

    it("formats decimal numbers", () => {
      expect(formatSI(-0.00000001, "W")).toMatchObject({
        value: -10,
        unit: "nW",
      });
      expect(formatSI(-0.125123, "W")).toMatchObject({
        value: -125.123,
        unit: "mW",
      });
      expect(formatSI(-1e-25, "W")).toMatchObject({
        value: -0.1,
        unit: "yW",
      });
      expect(formatSI(-1e-51, "W")).toMatchObject({
        value: -1e-27,
        unit: "yW",
      });
    });
  });

  it('returns "0" when value is 0', () => {
    expect(formatSI(0, "W")).toMatchObject({
      value: 0,
      unit: "W",
    });
    expect(formatSI(-0, "W")).toMatchObject({
      value: 0,
      unit: "W",
    });
    expect(formatSI("0", "W")).toMatchObject({
      value: 0,
      unit: "W",
    });
    expect(formatSI("-0", "W")).toMatchObject({
      value: 0,
      unit: "W",
    });
  });

  it("returns null on values that are not numbers", () => {
    expect(formatSI("Something", "")).toMatchObject({
      value: null,
      unit: "",
    });
    expect(formatSI("", "")).toMatchObject({ value: null, unit: "" });
  });
});

describe("format fixed si prefixes", () => {
  it("adds decimals", () => {
    expect(formatFixedSI(204, "W", 2)).toMatchObject({
      value: "204.00",
      unit: "W",
    });
    expect(formatFixedSI(0.3, "W", 2)).toMatchObject({
      value: "300.00",
      unit: "mW",
    });
    expect(formatFixedSI(161261, "W", 2)).toMatchObject({
      value: "161.26",
      unit: "kW",
    });
    expect(formatFixedSI(-161261, "W", 2)).toMatchObject({
      value: "-161.26",
      unit: "kW",
    });
  });

  it("formats decimal numbers", () => {
    expect(formatFixedSI(0.00251, "W", 2)).toMatchObject({
      value: "2.51",
      unit: "mW",
    });
    expect(formatFixedSI(-0.00251, "W", 2)).toMatchObject({
      value: "-2.51",
      unit: "mW",
    });
  });

  it("changes based on the fractionDigits param", () => {
    expect(formatFixedSI(1, "W", 1)).toMatchObject({
      value: "1.0",
    });
    expect(formatFixedSI(1, "W", 3)).toMatchObject({
      value: "1.000",
    });
    expect(formatFixedSI(-1, "W", 3)).toMatchObject({
      value: "-1.000",
    });
  });

  it("returns null on values that are not numbers", () => {
    expect(formatFixedSI("Something", "", 2)).toMatchObject({
      value: null,
      unit: "",
    });
    expect(formatFixedSI("", "", 2)).toMatchObject({ value: null, unit: "" });
  });

  it("returns exponential notation on very large numbers", () => {
    expect(formatFixedSI("-1e+100", "W", 3)).toMatchObject({
      value: "-1.0e+76",
      unit: "YW",
    });
    expect(formatFixedSI("-1e+100", "W", 4, 2)).toMatchObject({
      value: "-1.00e+76",
      unit: "YW",
    });
  });
});

describe("format precision si prefixes", () => {
  it("adds decimals", () => {
    expect(formatPrecisionSI(204, "W", 4)).toMatchObject({
      value: "204.0",
      unit: "W",
    });
    expect(formatPrecisionSI(0.3, "W", 2)).toMatchObject({
      value: "3.0e+2",
      unit: "mW",
    });
    expect(formatPrecisionSI(161261, "W", 5)).toMatchObject({
      value: "161.26",
      unit: "kW",
    });
    expect(formatPrecisionSI(-161261, "W", 10)).toMatchObject({
      value: "-161.2610000",
      unit: "kW",
    });
  });

  it("formats decimal numbers", () => {
    expect(formatPrecisionSI(0.00251, "W", 3)).toMatchObject({
      value: "2.51",
      unit: "mW",
    });
    expect(formatPrecisionSI(-0.00251, "W", 3)).toMatchObject({
      value: "-2.51",
      unit: "mW",
    });
  });

  it("changes based on the fractionDigits param", () => {
    expect(formatPrecisionSI(1, "W", 1)).toMatchObject({
      value: "1",
    });
    expect(formatPrecisionSI(1, "W", 3)).toMatchObject({
      value: "1.00",
    });
    expect(formatPrecisionSI(-1, "W", 3)).toMatchObject({
      value: "-1.00",
    });
  });

  it("returns null on values that are not numbers", () => {
    expect(formatPrecisionSI("Something", "W", 2)).toMatchObject({
      value: null,
      unit: "",
    });
    expect(formatPrecisionSI("", "W", 2)).toMatchObject({
      value: null,
      unit: "",
    });
  });

  it("returns exponential notation on very large numbers", () => {
    expect(formatPrecisionSI("-1e+100", "W", 3)).toMatchObject({
      value: "-1.0e+76",
      unit: "YW",
    });
    expect(formatPrecisionSI("-1e+100", "W", 4, 2)).toMatchObject({
      value: "-1.00e+76",
      unit: "YW",
    });
  });
});
