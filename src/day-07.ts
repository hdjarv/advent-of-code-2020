import { EOL, strToNum } from "./lib/utils";

type InnerBag = {
  count: number;
  color: string;
};

type Bag = {
  color: string;
  innerBags: InnerBag[];
};

function parse(line: string): Bag {
  const [color, rest] = line.split(" bags contain ");
  const result = { color: color, innerBags: [] as InnerBag[] };
  if (rest !== "no other bags.") {
    for (let bag of rest.split(", ")) {
      const re_result = /^(\d+) (.+) bag.*/.exec(bag);
      result.innerBags.push({ count: strToNum(re_result![1]), color: re_result![2] });
    }
  }

  return result;
}

function findBagsContainingColor(input: Bag[], colorsToFind: string[], result: Set<string>): Set<string> {
  const initialResultSize = result.size;

  input
    .filter((bag) => bag.innerBags.filter(({ count, color }) => colorsToFind.includes(color)).length > 0)
    .forEach((bag) => {
      result.add(bag.color);
    });
  if (result.size !== initialResultSize) {
    return findBagsContainingColor(input, [...result], result);
  }

  return result;
}

function countInnerBags(input: Bag[], color: string): number {
  const bag = input.filter((bag) => bag.color === color)[0];

  let result = 0;
  for (let innerBag of bag.innerBags) {
    result += innerBag.count + countInnerBags(input, innerBag.color) * innerBag.count;
  }
  return result;
}

function solvePart1(input: Bag[]): number {
  return findBagsContainingColor(input, ["shiny gold"], new Set<string>()).size;
}

function solvePart2(input: Bag[]): number {
  return countInnerBags(input, "shiny gold");
}

export default async (data: string, ..._args: any) => {
  const input = data.split(EOL).map(parse);

  console.log(`Part 1: The number of bag colors are: ${solvePart1(input)}`); // 124 is correct
  console.log(`Part 2: The number of bags inside shiny gold bag are: ${solvePart2(input)}`); // 34862 is correct
};
