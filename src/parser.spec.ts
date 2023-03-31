import { describe, it, expect } from "vitest";
import { parsePrompt, parsePromptVariables } from "./parser";

describe("parsePromptVariables", () => {
  it("should parse variables", () => {
    expect(
      parsePromptVariables(
        {
          variables: {
            name: {
              name: "name",
              type: "string",
              description: "The name",
              required: true,
            },
            age: {
              name: "age",
              type: "string",
              description: "The age",
              required: false,
              default: "42",
            },
          },
        },
        { name: "World" }
      )
    ).toEqual({ name: "World", age: "42" });
  });

  it("should throw if required variable is missing", () => {
    expect(() =>
      parsePromptVariables(
        {
          variables: {
            name: {
              name: "name",
              type: "string",
              description: "The name",
              required: true,
            },
            age: {
              name: "age",
              type: "string",
              description: "The age",
              required: false,
              default: "42",
            },
          },
        },
        {}
      )
    ).toThrowError("Missing required variable name");
  });
});

describe("parsePrompt", () => {
  it("should parse prompt", () => {
    expect(
      parsePrompt(
        {
          name: "test",
          description: "Test",
          message: "Hello {name}!",
          variables: {
            name: {
              name: "name",
              type: "string",
              description: "The name",
              required: true,
            },
          },
        },
        { name: "World" }
      )
    ).toEqual({
      messages: [
        {
          role: "system",
          content: "Hello World!",
        },
      ],
    });
  });

  it("should parse prompt with multiple messages", () => {
    expect(
      parsePrompt(
        {
          name: "test",
          description: "Test",
          message: [
            {
              role: "system",
              content: "Hello, {name}!",
            },
            {
              role: "system",
              content: "How are you, {name}?",
            },
          ],
          variables: {
            name: {
              name: "name",
              type: "string",
              description: "The name",
              required: true,
            },
          },
        },
        { name: "World" }
      )
    ).toEqual({
      messages: [
        {
          role: "system",
          content: "Hello, World!",
        },
        {
          role: "system",
          content: "How are you, World?",
        },
      ],
    });
  });
});
