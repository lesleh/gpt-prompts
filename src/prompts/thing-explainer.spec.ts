import { describe, it, expect } from "vitest";
import { parsePrompt } from "../parser.js";
import { thingExplainer } from "./thing-explainer.js";

describe("thingExplainer", () => {
  it("creates a simple prompt for a 5 year old child", () => {
    expect(parsePrompt(thingExplainer, { thing: "rainbows" })).toEqual({
      messages: [
        {
          role: "system",
          content:
            "Explain rainbows to a 5 year old child. Make it fun. Use tiny words. Use short sentences. No big words.",
        },
      ],
    });
  });
});
