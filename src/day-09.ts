import { EOL, strToNum } from "./lib/utils";

const PREAMBLE_SIZE = 25;

function invalidNumber(val: number, ix: number, data: number[]): boolean {
  if (ix < PREAMBLE_SIZE) return false;

  const startIx = ix - PREAMBLE_SIZE;
  for (let i = startIx; i < ix; i++) {
    for (let j = startIx; j < ix; j++) {
      if (j === i) continue;
      if (data[i] + data[j] === val) {
        return false;
      }
    }
  }
  return true;
}

function sumRange(numbers: number[], startIx: number, endIx: number): number {
  let result = 0;
  for (let i = startIx; i <= endIx; i++) {
    result += numbers[i];
  }

  return result;
}

function solvePart1(input: number[]): number {
  return input.filter(invalidNumber)[0];
}

function solvePart2(input: number[], target: number): number {
  for (let i = 0; i < input.length - 2; i++) {
    if (input[i] >= target) continue;
    for (let j = i + 1; j < input.length - 1; j++) {
      if (input[j] >= target) continue;
      if (sumRange(input, i, j) === target) {
        let smallest = Number.MAX_VALUE,
          largest = Number.MIN_VALUE;
        for (let k = i; k <= j; k++) {
          if (input[k] < smallest) smallest = input[k];
          if (input[k] > largest) largest = input[k];
        }
        return smallest + largest;
      }
    }
  }
  return -1;
}

export default async (data: string) => {
  const input = data.split(EOL).map(strToNum);
  const part1Result = solvePart1(input);

  console.log(`Part 1: The first invalid number is: ${part1Result}`); // 1212510616 is correct
  console.log(`Part 2: The encryption weakness is: ${solvePart2(input, part1Result)}`); // 171265123 is correct
};
