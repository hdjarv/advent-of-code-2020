import { FrequencyTable } from "./lib/types";
import { EOL } from "./lib/utils";

type Person = {
  answers: string[];
};

type Group = Person[];

function parse(input: string[]): Group[] {
  const result: Group[] = [];
  let group: Group | undefined = [];
  for (let line of input) {
    if (line === "") {
      if (group) {
        result.push(group);
        group = undefined;
      }
      continue;
    }
    if (!group) {
      group = [];
    }
    group.push({ answers: line.split("") });
  }
  if (group) {
    result.push(group);
  }

  return result;
}

function solvePart1(input: Group[]): number {
  return input
    .map((group) => {
      return [...new FrequencyTable(group.flatMap((person) => person.answers)).keys()].length;
    })
    .reduce((res, val) => res + val, 0);
}

function solvePart2(input: Group[]): number {
  return input
    .map((group) => {
      const allAnswers = [...new FrequencyTable(group.flatMap((person) => person.answers)).keys()];
      const groupResult = [];
      for (let answer of allAnswers) {
        let add = true;
        for (let person of group) {
          if (!person.answers.includes(answer)) {
            add = false;
            break;
          }
        }
        if (add) {
          groupResult.push(answer);
        }
      }
      return groupResult.length;
    })
    .reduce((res, val) => res + val, 0);
}

export default async (data: string, ..._args: any) => {
  const input = parse(data.split(EOL));

  console.log(`Part 1: The sum is: ${solvePart1(input)}`); // 6714 is correct
  console.log(`Part 2: The sum is: ${solvePart2(input)}`); // 3435 is correct
};
