const { compare } = require("./equality");

describe("EqualityTable", () => {
  it("should coerce as expected", () => {
    expect(compare(true, true)).toBe(true);
    expect(compare(true, false)).toBe(false);
    expect(compare(true, 1)).toBe(true);
    expect(compare(true, 0)).toBe(false);
    expect(compare(true, -1)).toBe(false);
    expect(compare(true, "true")).toBe(false);
    expect(compare(true, "false")).toBe(false);
    expect(compare(true, "1")).toBe(true);
    expect(compare(true, "0")).toBe(false);
    expect(compare(true, "-1")).toBe(false);
    expect(compare(true, "")).toBe(false);
    expect(compare(true, null)).toBe(false);
    expect(compare(true, undefined)).toBe(false);
    expect(compare(true, Infinity)).toBe(false);
    expect(compare(true, -Infinity)).toBe(false);
    expect(compare(true, [])).toBe(false);
    expect(compare(true, {})).toBe(false);
    expect(compare(true, [[]])).toBe(false);
    expect(compare(true, [0])).toBe(false);
    expect(compare(true, [1])).toBe(true);
    expect(compare(true, NaN)).toBe(false);
  });
});
