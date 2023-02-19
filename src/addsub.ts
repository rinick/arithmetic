import {d, PairPool, Problem, selectRaw} from './problem';
import React from "react";


export function selectAddAub(level: number,  count: number): string[] {
  let min = 1;
  let max = 9;
  let items = 3;
  switch (level) {
    case 2:
      min = 10;
      max = 20;
      break;
    case 3:
      min = 10;
      max = 50;
      items = 4;
      break;
    case 4:
      min = 10;
      max = 99;
      items = 4;
      break;
    case 5:
      min = 10;
      max = 200;
      break;
    case 6:
      min = 10;
      max = 500;
      items = 4;
      break;
    case 7:
      min = 100;
      max = 999;
      items = 4;
      break;
  }
  const makeNumber = () => Math.floor(Math.random() * (max - min)) + min;
  const makeProblem = () => {
    while(true) {
      let result = makeNumber();
      let str = result.toString();

      for (let i = 1; i < items; ++i) {
        let n = makeNumber();
        if (Math.random() > 0.5) {
          // plus
          result += n;
          str += ` + ${n}`;
        } else {
          // minus
          result -= n;
          str += ` - ${n}`;
        }
      }
      if (result > 0) {
        return `${str} = `
      }
    }
  }

  let result: string[] = [];
  for (let i = 0; i < count; ++i) {
    result.push(makeProblem());
  }

  return result;
}