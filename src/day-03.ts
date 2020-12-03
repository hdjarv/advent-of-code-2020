import { EOL } from "./lib/utils";

function solvePart1(input: string[][], slopeX = 3, slopeY = 1): number {
  let x = 0,
    y = 0,
    treeCount = 0;

  while (y < input.length) {
    if (x >= input[x].length) {
      x = x - input[x].length;
    }
    if (input[y][x] === "#") {
      treeCount++;
    }
    x += slopeX;
    y += slopeY;
  }

  return treeCount;
}

function solvePart2(input: string[][]): any {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  return slopes.map((slope) => solvePart1(input, ...slope)).reduce((res, val) => res * val, 1);
}

export default async (data: string, ..._args: any) => {
  const input = data.split(EOL).map((line) => line.split(""));

  console.log(`Part 1: Number of trees: ${solvePart1(input)}`); // 211 is correct
  console.log(`Part 2: The result is: ${solvePart2(input)}`); // 3584591857 is correct
};
