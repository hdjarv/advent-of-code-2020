import { EOL, findMinMaxInRange, strToNum, sumRange } from "./lib/utils";

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

function solvePart1(input: number[]): number {
  return input.filter(invalidNumber)[0];
}

function solvePart2(input: number[], target: number): number {
  for (let i = 0; i < input.length - 2; i++) {
    if (input[i] >= target) continue;
    for (let j = i + 1; j < input.length - 1; j++) {
      if (input[j] >= target) continue;
      if (sumRange(input, i, j + 1) === target) {
        const { min, max } = findMinMaxInRange(input, i, j + 1);
        return min + max;
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
