#!/usr/bin/env node

import { existsSync as fileExists, readFile as _readFile } from "fs";
import { basename, join } from "path";
import { promisify } from "util";

const readFile = promisify(_readFile);

if (process.argv.length < 3) {
  console.error(`Usage: ${basename(process.argv[1])} <day> [<arg1>...<argN>]`);
  process.exit(1);
}

const dayNo = Number.parseInt(process.argv[2], 10);
const dayModule = `day-${dayNo < 10 ? `0${dayNo}` : dayNo}`;
const inputFile = join(__dirname, "inputs", dayModule + "-input.txt");

if (!fileExists(join(__dirname, dayModule + ".js"))) {
  console.error(`Not implemented`);
  process.exit(2);
}

if (!fileExists(inputFile)) {
  console.error(`No input file found`);
  process.exit(3);
}

console.log(`AOC 2020 - Day ${dayNo}`);
const day = require("./" + dayModule);

(async () => {
  try {
    const data = (await readFile(inputFile)).toString();
    await day.default(data, ...process.argv.slice(3));
  } catch (error) {
    console.error(`Error running Day ${dayNo}`);
    console.error(error.stack);
    process.exit(4);
  }
})();
