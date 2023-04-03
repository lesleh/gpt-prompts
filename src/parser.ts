import { ChatCompletionRequestMessage } from "openai";
import { tofu } from "./tofu";
import { Prompt, PromptResult, PromptVariable } from "./types";

/**
 * Parses a prompt variable and returns the parsed value.
 *
 * @param variableDefinition {PromptVariable} - the variable definition
 * @param value {string} - the value to parse
 * @returns the parsed variable value
 *
 * @internal
 */
function parsePromptVariable(
  variableDefinition: PromptVariable,
  value: string
) {
  if (variableDefinition.required && !value) {
    throw new Error(`Missing required variable ${variableDefinition.name}`);
  }
  return value ?? variableDefinition.default;
}

/**
 * Finds any extra variables provided by the user that are not used in the prompt.
 *
 * @param promptVariables {Record<string, PromptVariable>} - the variables defined in the prompt
 * @param providedVariables - the variables provided by the user
 * @returns the extra variables
 *
 * @internal
 */
function findExtraVariables(
  promptVariables: Record<string, PromptVariable>,
  providedVariables: Record<string, string>
) {
  const promptKeys = Object.keys(promptVariables);
  const providedKeys = Object.keys(providedVariables);

  return providedKeys.filter((key) => !promptKeys.includes(key));
}

/**
 * Parses the variables in a prompt and returns the parsed variables.
 * @param prompt - the prompt to parse
 * @param providedVariables - the variables to use in the prompt
 * @returns the parsed variables
 * @public
 */
export function parsePromptVariables(
  prompt: Pick<Prompt, "variables">,
  providedVariables: Record<string, string>
) {
  const extraVariables = findExtraVariables(
    prompt.variables,
    providedVariables
  );

  if (extraVariables.length > 0) {
    throw new Error(
      `The following variables were provided but not used: ${extraVariables.join(
        ", "
      )}`
    );
  }

  const output = {} as Record<string, string>;
  for (const variableName in prompt.variables) {
    output[variableName] = parsePromptVariable(
      prompt.variables[variableName],
      providedVariables[variableName]
    );
  }
  return output;
}

/**
 * Parses a prompt and returns the parsed prompt.
 * @param prompt - the prompt to parse
 * @param variables - the variables to use in the prompt
 * @returns the parsed prompt result
 * @public
 */
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
