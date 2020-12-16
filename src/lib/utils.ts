import { existsSync as fileExists, readFile as _readFile } from "fs";
import { EOL } from "os";
import { basename, join } from "path";
import { promisify } from "util";

export { basename, EOL, fileExists, join };

export const readFile = promisify(_readFile);

export const numToStr = (n: number): string => `${n}`;
export const strToNum = (s: string): number => Number.parseInt(s, 10);

export const findMinMaxInRange = (
  numbers: number[],
  start: number = 0,
  end: number = numbers.length
): { min: number; max: number } => {
  let min = Number.MAX_VALUE,
    max = Number.MIN_VALUE;
  for (let i = start; i < end; i++) {
    if (numbers[i] < min) min = numbers[i];
    if (numbers[i] > max) max = numbers[i];
  }
  return { min, max };
};

export const sumRange = (numbers: number[], start: number = 0, end: number = numbers.length): number => {
  let result = 0;
  for (let i = start; i < end; i++) {
    result += numbers[i];
  }

  return result;
};
