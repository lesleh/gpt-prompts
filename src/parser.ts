import { ChatCompletionRequestMessage } from "openai";
import { tofu } from "./tofu";
import { Prompt, PromptResult } from "./types";

export function parsePromptVariables(
  prompt: Pick<Prompt, "variables">,
  providedVariables: Record<string, string>
) {
  const output = {} as Record<string, string>;
  for (const variableName in prompt.variables) {
    const variable = prompt.variables[variableName];
    const providedValue = providedVariables[variableName];
    if (variable.required && !providedValue) {
      throw new Error(`Missing required variable ${variableName}`);
    }
    output[variableName] = providedValue ?? variable.default;
  }

  return output;
}

export function parsePrompt(
  prompt: Prompt,
  variables: Record<string, string>
): PromptResult {
  const parsedVariables = parsePromptVariables(prompt, variables);

  const messages: ChatCompletionRequestMessage[] = Array.isArray(prompt.message)
    ? prompt.message
    : [
        {
          role: "system",
          content: prompt.message,
        },
      ];

  const parsedMessages = messages.map((message) => {
    const parsedContent = tofu(message.content, parsedVariables);
    return {
      ...message,
      role: message.role ?? "system",
      content: parsedContent,
    };
  });

  return {
    messages: parsedMessages,
  };
}
