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

  isNew(str: string) {
    if (this.used.has(str)) {
      return false;
    }
    this.used.add(str);
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
