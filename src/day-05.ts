import { EOL } from "./lib/utils";

type Seat = {
  row: number;
  column: number;
  seatId: number;
};

function parseLine(line: string, lineStartIx: number, lineEndIx: number, maxValue: number): number {
  const steps = line.substring(lineStartIx, lineEndIx).split("");
  let lowerBound = 0,
    upperBound = maxValue - 1;
  for (let i = 0; i <= steps.length; i++) {
    const increase = ["R", "B"].includes(steps[i]);
    if (increase) {
      lowerBound += (upperBound + 1 - lowerBound) / 2;
    } else {
      upperBound = (upperBound + 1) / 2 + lowerBound / 2 - 1;
    }
    if (i === steps.length - 1) {
      return increase ? upperBound : lowerBound;
    }
  }

  return -1;
}

function parse(line: string): Seat {
  const row = parseLine(line, 0, 7, 128);
  const col = parseLine(line, 7, 10, 8);

  return { row: row, column: col, seatId: row * 8 + col };
}

function sortBySeatId(a: Seat, b: Seat): number {
  return a.seatId - b.seatId;
}

function solvePart1(input: Seat[]): number {
  return input.reduce((res, val) => (val.seatId > res ? val.seatId : res), 0);
}

function solvePart2(input: Seat[]): number {
  const seatIDs = input.map((seat) => seat.seatId);
  for (let i = 1; i < seatIDs.length - 1; i++) {
    if (!seatIDs.includes(seatIDs[i] + 1)) {
      return seatIDs[i] + 1;
    }
  }

  return 0;
}

export default async (data: string, ..._args: any) => {
  const input = data.split(EOL).map(parse).sort(sortBySeatId);

  console.log(`Part 1: The highest seat ID is: ${solvePart1(input)}`); // 953 is correct
  console.log(`Part 2: My seat ID is: ${solvePart2(input)}`); // 615 is correct
};
