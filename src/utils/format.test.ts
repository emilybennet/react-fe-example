import { formatCurrency } from "./format";

describe("formatCurrency", () => {
  it("by default only displays cents when present", () => {
    expect(formatCurrency(100)).toBe("$1");
    expect(formatCurrency(199)).toBe("$1.99");
  });

  it("supports an optional property to always show or hide cents", () => {
    expect(formatCurrency(100, { showCents: "always" })).toBe("$1.00");
    expect(formatCurrency(199, { showCents: "never" })).toBe("$1");
  });
});
