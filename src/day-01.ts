import { EOL, strToNum } from "./lib/utils";

function solvePart1(data: number[]): number {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (j === i) continue;
      if (data[i] + data[j] === 2020) {
        return data[i] * data[j];
      }
    }
  }
  return -1;
}

function solvePart2(data: number[]): number {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      for (let k = 0; k < data.length; k++) {
        if (j === i && k === i) continue;
        if (data[i] + data[j] + data[k] === 2020) {
          return data[i] * data[j] * data[k];
        }
      }
    }
  }
  return -1;
}

export default async (input: string) => {
  const data = input.split(EOL).map(strToNum);

  console.log(`Part 1: The result is: ${solvePart1(data)}`); // 878724 is correct
  console.log(`Part 2: The result is: ${solvePart2(data)}`); // 201251610 is correct
};
