export abstract class Problem {
  count: number;
  addCount(): boolean {
    ++this.count;
    return true;
  }

  constructor(public level: number) {}

  abstract generate(pool: Pool): string;
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
        if (Math.random() > 0.5) {
          result.push([i, j]);
        } else {
          result.push([j, i]);
        }
      }
    }
    for (let i = 0; i < result.length; ++i) {
      let j = Math.floor(Math.random() * result.length);
      if (i !== j) {
        [result[i], result[j]] = [result[j], result[i]];
      }
    }
    this.pool = new Set<[number, number]>(result);
  }

  exists(str: string) {
    if (this.used.has(str)) {
      return true;
    }
    this.used.add(str);
    return false;
  }

  get09(): [number, number] {
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
    let a = d(1, 8);
    let b = d(a + 1, 9);
    return [a, b - a];
  }
}
