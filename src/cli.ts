#!/usr/bin/env node

import { characterImpersonator } from "./prompts/index.js";
import { Prompt, PromptVariable } from "./types.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - This errors for the CJS build but works for the ESM build
import { type Question } from "inquirer";
import { parsePrompt } from "./parser.js";

function convertPromptToInquirerQuestions(prompt: Prompt): Question[] {
  return Object.values(prompt.variables).map((variable: PromptVariable) => ({
    // TODO: Handle other types
    type: variable.type === "string" ? "input" : "input",
    name: variable.name,
    message: variable.description,
    default: variable.default,
  }));
}

async function selectPrompt(prompts: Prompt[]) {
  // TODO: Move this to the static import once CJS build is removed
  // Ref: https://github.com/lesleh/gpt-prompts/issues/12
  const inquirer = (await import("inquirer")).default;

  // Select the prompt
  const promptChoices = prompts.map((prompt) => ({
    name: `${prompt.name} - ${prompt.description}`,
    value: prompt,
  }));

  const { selectedPrompt } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedPrompt",
      message: "Select a prompt:",
      choices: promptChoices,
    },
  ]);

  return selectedPrompt;
}

async function main() {
  // TODO: Move this to the static import once CJS build is removed
  // Ref: https://github.com/lesleh/gpt-prompts/issues/12
  const inquirer = (await import("inquirer")).default;

  const selectedPrompt = await selectPrompt([
    // ... other prompts
    characterImpersonator,
  ]);

  // Ask the user for input based on the selected prompt
  const inquirerQuestions = convertPromptToInquirerQuestions(selectedPrompt);
  const answers = await inquirer.prompt(inquirerQuestions);

  // Parse the prompt message
  const parsedPrompt = parsePrompt(selectedPrompt, answers);

  if (parsedPrompt.messages.length === 0) {
    console.log("No messages found");
    return;
  }

  if (parsedPrompt.messages.length === 1) {
    console.log(parsedPrompt.messages[0].content);
    return;
  }

  // Multiple messages
  console.log(JSON.stringify(parsedPrompt.messages, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
