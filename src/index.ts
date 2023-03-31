import { OpenAIApi } from "openai";

console.log(OpenAIApi);

export function add(a: number, b: number): number {
  return a + b;
}

console.log(add(1, 2));
