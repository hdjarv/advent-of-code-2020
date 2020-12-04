import { EOL, strToNum } from "./lib/utils";

type Passport = {
  byr: string | null; // (Birth Year)
  iyr: string | null; // (Issue Year)
  eyr: string | null; // (Expiration Year)
  hgt: string | null; // (Height)
  hcl: string | null; // (Hair Color)
  ecl: string | null; // (Eye Color)
  pid: string | null; // (Passport ID)
  cid: string | null; // (Country ID)
  [index: string]: string | null;
};

function createPassport(): Passport {
  return { byr: null, iyr: null, eyr: null, hgt: null, hcl: null, ecl: null, pid: null, cid: null };
}

function parse(input: string[]): Passport[] {
  const result: Passport[] = [];
  let passport: Passport | undefined;
  for (let line of input) {
    if (line === "") {
      if (passport) {
        result.push(passport);
        passport = undefined;
      }
      continue;
    }
    if (!passport) {
      passport = createPassport();
    }
    for (let part of line.split(" ")) {
      const [key, value] = part.split(":");
      passport[key] = value;
    }
  }
  if (passport) {
    result.push(passport);
  }

  return result;
}

function isValidPassport1(passport: Passport): boolean {
  return (
    passport.byr !== null &&
    passport.iyr !== null &&
    passport.eyr !== null &&
    passport.hgt !== null &&
    passport.hcl !== null &&
    passport.ecl !== null &&
    passport.pid !== null
  );
}

function validNumber(num: string | null, minValue: number, maxValue: number): boolean {
  if (num === null) {
    return false;
  }

  const n = strToNum(num);
  return n >= minValue && n <= maxValue;
}

function validHeight(height: string | null): boolean {
  if (height === null) {
    return false;
  }

  const re = /^(\d+)(cm|in)$/;
  const reResult = re.exec(height);
  if (reResult === null) {
    return false;
  }

  if (reResult[2] === "cm") {
    return validNumber(reResult[1], 150, 193);
  } else {
    return validNumber(reResult[1], 59, 76);
  }
}

function validRegExp(value: string | null, regExp: RegExp): boolean {
  if (value === null) {
    return false;
  }
  return regExp.test(value);
}

function isValidPassport2(passport: Passport): boolean {
  return (
    validNumber(passport.byr, 1920, 2002) &&
    validNumber(passport.iyr, 2010, 2020) &&
    validNumber(passport.eyr, 2020, 2030) &&
    validHeight(passport.hgt) &&
    validRegExp(passport.hcl, /^#[0-9a-f]{6}$/) &&
    validRegExp(passport.ecl, /^(amb|blu|brn|gry|grn|hzl|oth)$/) &&
    validRegExp(passport.pid, /^\d{9}$/)
  );
}

function solve(passports: Passport[], validateFn: (passport: Passport) => boolean): number {
  return passports.filter(validateFn).length;
}

export default async (data: string) => {
  const input = parse(data.split(EOL));

  console.log(`Part 1: Number of valid passports: ${solve(input, isValidPassport1)}`); // 192 is correct
  console.log(`Part 2: Number of valid passports: ${solve(input, isValidPassport2)}`); // 101 is correct
};
