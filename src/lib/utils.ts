import { existsSync as fileExists, readFile as _readFile } from "fs";
import { EOL } from "os";
import { basename, join } from "path";
import { promisify } from "util";

export { basename, EOL, fileExists, join };

export const readFile = promisify(_readFile);

export const numToStr = (n: number): string => `${n}`;
export const strToNum = (s: string): number => Number.parseInt(s, 10);
