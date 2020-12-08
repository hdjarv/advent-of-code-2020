import { EOL, strToNum } from "./lib/utils";

enum Operator {
  Acc = 1,
  Jmp = 2,
  Nop = 3,
}

type Instruction = {
  op: Operator;
  arg: number;
};

type State = {
  acc: number;
  instrPtr: number;
  code: Instruction[];
  pastInstrPtrs: number[];
  normalExit: boolean;
};

function cloneInstruction(instr: Instruction): Instruction {
  return { op: instr.op, arg: instr.arg };
}

function parseOp(opString: string): Operator {
  switch (opString) {
    case "acc":
      return Operator.Acc;
    case "jmp":
      return Operator.Jmp;
    default:
      return Operator.Nop;
  }
}

function parse(line: string): Instruction {
  const [opString, argString] = line.split(" ");
  return { op: parseOp(opString), arg: strToNum(argString) };
}

function run(code: Instruction[]): State {
  const state: State = { acc: 0, code: code, instrPtr: 0, pastInstrPtrs: [], normalExit: false };
  while (!state.pastInstrPtrs.includes(state.instrPtr)) {
    state.pastInstrPtrs.push(state.instrPtr);
    const instr = state.code[state.instrPtr];
    switch (instr.op) {
      case Operator.Acc:
        state.acc += instr.arg;
        state.instrPtr += 1;
        break;
      case Operator.Jmp:
        state.instrPtr += instr.arg;
        break;
      default:
        state.instrPtr += 1;
    }
    if (state.instrPtr === state.code.length) {
      state.normalExit = true;
      break;
    }
  }
  return state;
}

function solvePart1(input: Instruction[]): number {
  const state = run(input);
  return state.acc;
}

function solvePart2(input: Instruction[]): number {
  let state = run(input);
  let modifyPtr = 0;
  while (!state.normalExit) {
    const code = input.map(cloneInstruction);
    for (let i = modifyPtr; i < code.length; i++) {
      if ([Operator.Jmp, Operator.Nop].includes(code[i].op)) {
        code[i].op = code[i].op === Operator.Nop ? Operator.Jmp : Operator.Nop;
        modifyPtr = i + 1;
        break;
      }
    }
    state = run(code);
  }
  return state.acc;
}

export default async (data: string) => {
  const input = data.split(EOL).map(parse);

  console.log(`Part 1: The accumulator value is: ${solvePart1(input)}`); // 1087 is correct
  console.log(`Part 2: The accumulator value is: ${solvePart2(input)}`); // 780 is correct
};
