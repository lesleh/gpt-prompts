import type { Prompt } from "../types.js";

/**
 * Prompt to explain a thing to a 5 year old child.
 * @public
 */
export const thingExplainer: Prompt = {
  name: "thing-explainer",
  description: "Explain a thing to a 5 year old child",
  message:
    "Explain {thing} to a 5 year old child. Make it fun. Use tiny words. Use short sentences. No big words.",
  variables: {
    thing: {
      name: "thing",
      type: "string",
      description: "The thing to explain",
      required: true,
    },
  },
};
