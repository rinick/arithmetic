import {d, PairPool, Problem, selectRaw} from './problem';

class ProblemAdd10 extends Problem {
  addCount(): boolean {
    if (this.count >= 20) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getAdd1();
    pool.isNew(x, y);
    return [x, y];
  }
}

class ProblemAdd15 extends Problem {
  addCount(): boolean {
    if (this.count >= 25) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: PairPool): [number, number] {
    let x: number, y: number;
    for (let i = 0; i < 20; ++i) {
      [x, y] = pool.getAdd1p5();
      if (pool.isNew(x, y)) {
        break;
      }
    }
    return [x, y];
  }
}

class ProblemAdd20 extends Problem {
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getPair((a, b) => a + b < 10);
    let xx: number, yy: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(0, 9) * 10 + x;
      yy = d(0, 9) * 10 + y;
      if (xx + yy >= 100) {
        continue;
      }

      if (pool.isNew(xx, yy)) {
        break;
      }
    }
    return [xx, yy];
  }
}

class ProblemAdd21 extends Problem {
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getAny();
    let xx: number, yy: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(1, 9) * 10 + x;
      yy = d(1, 9) * 10 + y;
      if (xx + yy >= 100) {
        continue;
      }

      if (pool.isNew(xx, yy)) {
        break;
      }
    }
    return [xx, yy];
  }
}

class ProblemAdd24 extends Problem {
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getPair((a, b) => a + b < 10);
    let xx: number, yy: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(1, 9) * 10 + x;
      yy = d(1, 9) * 10 + y;
      if (xx + yy < 100) {
        continue;
      }

      if (pool.isNew(xx, yy)) {
        break;
      }
    }
    return [xx, yy];
  }
}

class ProblemAdd26 extends Problem {
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getAdd1p5();
    let xx: number, yy: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(1, 9) * 10 + x;
      yy = d(1, 9) * 10 + y;
      if (xx + yy < 100) {
        continue;
      }

      if (pool.isNew(xx, yy)) {
        break;
      }
    }
    return [xx, yy];
  }
}

class ProblemAdd30 extends Problem {
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getAny();
    let xxx: number, yyy: number;
    for (let i = 0; i < 20; ++i) {
      let xx = d(0, 9) * 10 + x;
      let yy = d(0, 9) * 10 + y;
      xxx = d(0, 9) * 100 + xx;
      yyy = d(0, 9) * 100 + yy;

      if (xxx < 10 || yyy < 10 || xxx + yyy < 200) {
        // too small
        continue;
      }
      if (xxx + yyy >= 1000) {
        continue;
      }

      if (x + y >= 10 && xx + yy >= 100) {
        // allow no more than one carry over
        continue;
      }

      if (pool.isNew(xxx, yyy)) {
        break;
      }
    }
    return [xxx, yyy];
  }
}

class ProblemAdd34 extends Problem {
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getAny();
    let xxx: number, yyy: number;
    for (let i = 0; i < 20; ++i) {
      let xx = d(0, 9) * 10;
      let yy = d(0, 9) * 10;
      xxx = d(1, 9) * 100 + xx + x;
      yyy = d(1, 9) * 100 + yy + y;

      let carryOver = 0;
      if (x + y >= 10) {
        ++carryOver;
      }
      if (xx + yy >= 100) {
        ++carryOver;
      }
      if (xxx + yyy >= 1000) {
        ++carryOver;
      }
      if (carryOver !== 2) {
        continue;
      }
      if (pool.isNew(xxx, yyy)) {
        break;
      }
    }
    return [xxx, yyy];
  }
}

class ProblemAdd37 extends Problem {
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getAdd1p5();
    let xxx: number, yyy: number;
    for (let i = 0; i < 20; ++i) {
      let xx = d(0, 9) * 10;
      let yy = d(0, 9) * 10;
      xxx = d(1, 9) * 100 + xx + x;
      yyy = d(1, 9) * 100 + yy + y;

      if (xx + yy < 100) {
        continue;
      }
      if (xxx + yyy < 1000) {
        continue;
      }

      if (pool.isNew(xxx, yyy)) {
        break;
      }
    }
    return [xxx, yyy];
  }
}

class ProblemAdd4 extends Problem {
  generate(pool: PairPool): [number, number] {
    let [x, y] = pool.getAny();
    let xxxx: number, yyyy: number;
    for (let i = 0; i < 20; ++i) {
      xxxx = Math.floor(Math.random() * 1000) * 10 + x;
      yyyy = Math.floor(Math.random() * 1000) * 10 + y;
      if (xxxx + yyyy > 10000 || xxxx + yyyy < 1000) {
        continue;
      }

      if (pool.isNew(xxxx, yyyy)) {
        break;
      }
    }
    return [xxxx, yyyy];
  }
}
function selectAddLevel(level: number): new () => Problem {
  // make sure there is no rounding error
  level += 0.0001;

  if (level < 1.5) {
    return ProblemAdd10;
  }
  if (level < 2) {
    return ProblemAdd15;
  }
  if (level < 2.1) {
    return ProblemAdd20;
  }
  if (level < 2.4) {
    return ProblemAdd21;
  }
  if (level < 2.6) {
    return ProblemAdd24;
  }
  if (level < 3) {
    return ProblemAdd26;
  }
  if (level < 3.4) {
    return ProblemAdd30;
  }
  if (level < 3.7) {
    return ProblemAdd34;
  }
  if (level < 4) {
    return ProblemAdd37;
  }
  return ProblemAdd4;
}

export function selectAdd(level: [number, number], count: number, decimal: boolean): string[] {
  return selectRaw(selectAddLevel, level[0], level[1], count).map((values: [number, number]) => {
    if (decimal) {
      let [a, b] = values;
      let d = [10, 100, 1000][(Math.random() * 3) | 0];

      if (a >= d && Math.random() > 0.5) {
        a /= d * 10;
      } else {
        a /= d;
      }
      if (b >= d && Math.random() > 0.5) {
        b /= d * 10;
      } else {
        b /= d;
      }

      values = [a, b];
    }
    return values.join(' + ') + ' =';
  });
}

export function selectSubtract(level: [number, number], count: number, decimal: boolean): string[] {
  return selectRaw(selectAddLevel, level[0], level[1], count).map((values: [number, number]) => {
    let [a, b] = values;
    b += a;
    if (decimal) {
      let d = [10, 100, 1000][(Math.random() * 3) | 0];

      if (a >= d && Math.random() > 0.8) {
        a /= d * 10;
      } else {
        a /= d;
      }
      b /= d;

      values = [a, b];
    }
    return `${b} - ${a} = `;
  });
}

export function selectAddRaw(level: [number, number], count: number): number[][] {
  return selectRaw(selectAddLevel, level[0], level[1], count);
}
