import { EOL, strToNum } from "./lib/utils";

type Input = {
  minCountP1: number;
  maxCountP2: number;
  passwordChar: string;
  password: string;
};

const PARSE_RE = /^(\d+)-(\d+) (\w+): (\w+)$/;

function parse(val: string): Input {
  const result = PARSE_RE.exec(val);
  return {
    minCountP1: strToNum(result![1]),
    maxCountP2: strToNum(result![2]),
    passwordChar: result![3],
    password: result![4],
  };
}

function charCount(value: string, char: string): Number {
  return [...value].filter((c) => c === char).length;
}

function verify1(input: Input): boolean {
  const count = charCount(input.password, input.passwordChar);
  return count >= input.minCountP1 && count <= input.maxCountP2;
}

function verify2(input: Input): boolean {
  const p1 = input.password[input.minCountP1 - 1];
  const p2 = input.password[input.maxCountP2 - 1];

  return (
    (p1 === input.passwordChar && p2 !== input.passwordChar) || (p1 !== input.passwordChar && p2 === input.passwordChar)
  );
}

function calcValidPasswords(input: Input[], verifyFn: (input: Input) => boolean) {
  return input.map(verifyFn).filter((v) => v === true).length;
}

export default async (data: string, ..._args: any) => {
  const input = data.split(EOL).map(parse);

  console.log(`Part 1: The number of valid passwords: ${calcValidPasswords(input, verify1)}`); // 456 is correct
  console.log(`Part 2: The number of valid passwords: ${calcValidPasswords(input, verify2)}`); // 308 is correct
};
