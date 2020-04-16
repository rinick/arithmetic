import {d, Pool, Problem, selectRaw} from './problem';

class ProblemMultiply10 extends Problem {
  addCount(): boolean {
    if (this.count >= 10) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a: number, b: number) => a > 0 && b > 0 && a * b < 10);
    pool.isNew(x, y);
    return [x, y];
  }
}
class ProblemMultiply11 extends Problem {
  addCount(): boolean {
    if (this.count >= 8) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a: number, b: number) => a > 1 && b > 1 && (a === 2 || b === 2));
    pool.isNew(x, y);
    return [x, y];
  }
}

class ProblemMultiply12 extends Problem {
  addCount(): boolean {
    if (this.count >= 15) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a: number, b: number) => a > 1 && b > 1 && (a < 4 || b < 4));
    pool.isNew(x, y);
    return [x, y];
  }
}
class ProblemMultiply13 extends Problem {
  addCount(): boolean {
    if (this.count >= 26) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a: number, b: number) => a > 1 && b > 1 && (a < 6 || b < 6));
    pool.isNew(x, y);
    return [x, y];
  }
}

class ProblemMultiply15 extends Problem {
  addCount(): boolean {
    if (this.count >= 36) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.get29();
    pool.isNew(x, y);
    return [x, y];
  }
}

class ProblemMultiply20 extends Problem {
  addCount(): boolean {
    if (this.count >= 10) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a: number, b: number) => b > 1 && a * b < 10);
    let xx: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(1, 9) * 10 + x;
      if (xx * y >= 100) {
        continue;
      }

      if (pool.isNew(xx, y)) {
        break;
      }
    }
    return [xx, y];
  }
}

class ProblemMultiply21 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a: number, b: number) => b > 1 && a * b < 10);
    let xx: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(1, 9) * 10 + x;

      if (pool.isNew(xx, y)) {
        break;
      }
    }
    return [xx, y];
  }
}

class ProblemMultiply24 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a: number, b: number) => b > 1 && a * b > 10);
    let xx: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(1, 9) * 10 + x;

      if (pool.isNew(xx, y)) {
        break;
      }
    }
    return [xx, y];
  }
}

class ProblemMultiply30 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getAny();
    let xx: number, yy: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(1, 9) * 10 + x;
      yy = d(1, 9) * 10 + x;
      if (xx * yy > 1000) {
        continue;
      }
      if (pool.isNew(xx, yy)) {
        break;
      }
    }
    return [xx, yy];
  }
}
class ProblemMultiply35 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.get29();
    let xx: number, yy: number;
    for (let i = 0; i < 20; ++i) {
      xx = d(1, 9) * 10 + x;
      yy = d(1, 9) * 10 + x;
      if (xx * yy < 1000) {
        continue;
      }
      if (pool.isNew(xx, yy)) {
        break;
      }
    }
    return [xx, yy];
  }
}
class ProblemMultiply40 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.get29();
    let xxx: number, yyy: number;
    for (let i = 0; i < 20; ++i) {
      xxx = Math.floor(Math.random() * 100) * 10 + x;
      yyy = Math.floor(Math.random() * 100) * 10 + y;
      if (xxx < 10 || yyy < 10 || xxx + yyy < 200) {
        continue;
      }

      if (pool.isNew(xxx, yyy)) {
        break;
      }
    }
    return [xxx, yyy];
  }
}

function selectMultiplyLevel(level: number): new () => Problem {
  // make sure there is no rounding error
  level += 0.0001;

  if (level < 1.1) {
    return ProblemMultiply10;
  }
  if (level < 1.2) {
    return ProblemMultiply11;
  }
  if (level < 1.3) {
    return ProblemMultiply12;
  }
  if (level < 1.5) {
    return ProblemMultiply13;
  }
  if (level < 2.0) {
    return ProblemMultiply15;
  }
  if (level < 2.1) {
    return ProblemMultiply20;
  }
  if (level < 2.4) {
    return ProblemMultiply21;
  }
  if (level < 3.0) {
    return ProblemMultiply24;
  }
  if (level < 3.5) {
    return ProblemMultiply30;
  }
  if (level < 4) {
    return ProblemMultiply35;
  }
  return ProblemMultiply40;
}

export function selectMultiply(level: [number, number], count: number): string[] {
  return selectRaw(selectMultiplyLevel, level[0], level[1], count).map(
    (values: [number, number]) => values.join(' × ') + ' ='
  );
}

export function selectDivide(level: [number, number], count: number): string[] {
  return selectRaw(selectMultiplyLevel, level[0], level[1], count).map(
    (values: [number, number]) => `${values[0] * values[1]} ÷ ${values[1]} = `
  );
}
