import {shuffle} from './util';

export abstract class Problem {
  count: number = 0;
  addCount(): boolean {
    ++this.count;
    return true;
  }

  abstract generate(pool: Pool): [number, number];
}

export function d(a: number, b: number) {
  return Math.floor(Math.random() * (1 + b - a)) + a;
}

export class Pool {
  used: Set<string> = new Set<string>();
  pool: Set<[number, number]> = new Set<[number, number]>();

  constructor() {
    let result: [number, number][] = [];
    for (let i = 0; i <= 9; ++i) {
      for (let j = i; j <= 9; ++j) {
        if (i === 0 && Math.random() > 0.3) {
          // less 0
          continue;
        }
        if (Math.random() > 0.5) {
          result.push([i, j]);
        } else {
          result.push([j, i]);
        }
      }
    }
    result = shuffle(result);
    this.pool = new Set<[number, number]>(result);
  }

  isNew(a: number, b: number) {
    let str = `${a}_${b}`;
    if (this.used.has(str)) {
      return false;
    }
    this.used.add(str);
    this.used.add(`${b}_${a}`);
    return true;
  }

  getAny(): [number, number] {
    for (let pair of this.pool) {
      this.pool.delete(pair);
      return pair;
    }
    return [d(0, 9), d(0, 9)];
  }
  get19(): [number, number] {
    for (let pair of this.pool) {
      if (pair[0] > 0 && pair[1] > 0) {
        this.pool.delete(pair);
        return pair;
      }
    }
    return [d(1, 9), d(1, 9)];
  }
  get29(): [number, number] {
    for (let pair of this.pool) {
      if (pair[0] > 1 && pair[1] > 1) {
        this.pool.delete(pair);
        return pair;
      }
    }
    return [d(2, 9), d(2, 9)];
  }
  getAdd1(): [number, number] {
    for (let pair of this.pool) {
      if (pair[0] > 0 && pair[1] > 0 && pair[0] + pair[1] < 10) {
        this.pool.delete(pair);
        return pair;
      }
    }
    let a = d(1, 8);
    let b = d(a + 1, 9);
    return [a, b - a];
  }
  getAdd1p5(): [number, number] {
    for (let pair of this.pool) {
      if (pair[0] > 0 && pair[1] > 0 && pair[0] + pair[1] >= 10) {
        this.pool.delete(pair);
        return pair;
      }
    }
    let a = d(1, 9);
    let b = d(10 - a, 9);
    return [a, b];
  }
  getPair(rule: (a: number, b: number) => boolean): [number, number] {
    for (let pair of this.pool) {
      if (rule(pair[0], pair[1])) {
        this.pool.delete(pair);
        return pair;
      }
    }
    return Pool.newPair(rule);
  }
  static newPair(rule: (a: number, b: number) => boolean): [number, number] {
    for (let i = 0; i < 100; ++i) {
      let x = d(0, 9);
      let y = d(0, 9);
      if (rule(x, y)) {
        return [x, y];
      }
    }
    return [0, 0];
  }
}

export function selectRaw(
  selectLevel: (level: number) => new () => Problem,
  minLevel: number,
  maxLevel: number,
  count: number
): [number, number][] {
  // fix floating number issue
  maxLevel += 0.01;

  let typeCache: Map<any, Problem> = new Map();
  let levels: Map<number, Problem> = new Map();
  for (let level = minLevel; level <= maxLevel; level += 0.1) {
    let type = selectLevel(level);
    let p: Problem;
    if (typeCache.has(type)) {
      p = typeCache.get(type);
    } else {
      p = new type();
      typeCache.set(type, p);
    }
    levels.set(level, p);
  }
  if (count === 0 || levels.size === 0) {
    return [];
  }
  if (count < levels.size) {
    levels = new Map(shuffle([...levels]).slice(0, count));
  }
  let loop = (count * 5) / levels.size;
  addProblem: for (let i = 0; i < loop; ++i) {
    for (let [level, problem] of levels) {
      if (problem.addCount()) {
        if (--count === 0) {
          break addProblem;
        }
      }
    }
  }

  let pool = new Pool();

  let result: [number, number][] = [];
  for (let [level, problem] of levels) {
    for (; problem.count > 0; --problem.count) {
      result.push(problem.generate(pool));
    }
  }
  return result;
}
