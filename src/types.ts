import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";

/**
 * A variable in a prompt.
 * @public
 */
export type PromptVariable = {
  name: string;
  type: string;
  description: string;
  default?: string;
  required: boolean;
};

/**
 * A prompt definition, including the message and variables to use.
 * @public
 */
export type Prompt = {
  name: string;
  description: string;
  message: string | ChatCompletionRequestMessage[];
  variables: Record<string, PromptVariable>;
};

/**
 * The result of parsing a prompt.
 * @public
 */
export type PromptResult = {
  messages: ChatCompletionResponseMessage[];
};
