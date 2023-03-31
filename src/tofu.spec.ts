import { describe, it, expect } from "vitest";
import { tofu } from "./tofu.js";

describe("tofu", () => {
  it("should parse template", () => {
    expect(tofu("Hello {name}!", { name: "World" })).toBe("Hello World!");
  });

  it("should parse template with multiple variables", () => {
    expect(
      tofu("Hello {name}! {name} is {age} years old.", {
        name: "World",
        age: 42,
      })
    ).toBe("Hello World! World is 42 years old.");
  });

  it("should parse template with nested variables", () => {
    expect(
      tofu("Hello, {name.first} {name.last}!", {
        name: { first: "John", last: "McClane" },
      })
    ).toBe("Hello, John McClane!");
  });
});
