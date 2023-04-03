import type { Prompt } from "../types.js";

/**
 * Prompt to impersonate a character.
 * @public
 */
export const characterImpersonator: Prompt = {
  name: "character-impersonator",
  description: "Impersonate a character",
  message:
    "I want you to act like {character} from {from}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}.",
  variables: {
    character: {
      name: "character",
      type: "string",
      description: "The character to impersonate",
      default: "The Doctor",
      required: true,
    },
    from: {
      name: "from",
      type: "string",
      description: "The character's origin",
      default: "Doctor Who",
      required: true,
    },
  },
};
