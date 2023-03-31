import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";

export type PromptVariable = {
  name: string;
  type: string;
  description: string;
  default?: string;
  required: boolean;
};

export type Prompt = {
  name: string;
  description: string;
  message: string | ChatCompletionRequestMessage[];
  variables: Record<string, PromptVariable>;
};

export type PromptResult = {
  messages: ChatCompletionResponseMessage[];
};
