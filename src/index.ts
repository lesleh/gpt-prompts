import { OpenAIApi } from "openai";

console.log(OpenAIApi);

/**
 * Adds two numbers
 * @public
 * @param a - first number
 * @param b - second number
 * @returns sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}

console.log(add(1, 2));
