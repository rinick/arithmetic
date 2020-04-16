import {d, Pool, Problem, selectRaw} from './problem';
import {shuffle} from './util';

class ProblemAdd10 extends Problem {
  addCount(): boolean {
    if (this.count >= 20) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: Pool): [number, number] {
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
  generate(pool: Pool): [number, number] {
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
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a, b) => a + b < 10);
    for (let i = 0; i < 20; ++i) {
      let xx = d(0, 9) * 10 + x;
      let yy = d(0, 9) * 10 + y;
      if (xx + yy >= 100) {
        continue;
      }

      if (pool.isNew(xx, yy)) {
        [x, y] = [xx, yy];
        break;
      }
    }
    return [x, y];
  }
}

class ProblemAdd21 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getAny();
    for (let i = 0; i < 20; ++i) {
      let xx = d(1, 9) * 10 + x;
      let yy = d(1, 9) * 10 + y;
      if (xx + yy >= 100) {
        continue;
      }

      if (pool.isNew(xx, yy)) {
        [x, y] = [xx, yy];
        break;
      }
    }
    return [x, y];
  }
}

class ProblemAdd24 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getPair((a, b) => a + b < 10);
    for (let i = 0; i < 20; ++i) {
      let xx = d(1, 9) * 10 + x;
      let yy = d(1, 9) * 10 + y;
      if (xx + yy < 100) {
        continue;
      }

      if (pool.isNew(xx, yy)) {
        [x, y] = [xx, yy];
        break;
      }
    }
    return [x, y];
  }
}

class ProblemAdd26 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getAdd1p5();
    for (let i = 0; i < 20; ++i) {
      let xx = d(1, 9) * 10 + x;
      let yy = d(1, 9) * 10 + y;
      if (xx + yy < 100) {
        continue;
      }

      if (pool.isNew(xx, yy)) {
        [x, y] = [xx, yy];
        break;
      }
    }
    return [x, y];
  }
}

class ProblemAdd30 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getAny();
    for (let i = 0; i < 20; ++i) {
      let xx = d(0, 9) * 10 + x;
      let yy = d(0, 9) * 10 + y;
      let xxx = d(0, 9) * 100 + xx;
      let yyy = d(0, 9) * 100 + yy;

      if (xxx + yyy >= 1000) {
        continue;
      }

      if (x + y >= 10 && xx + yy >= 100) {
        // allow no more than one carry over
        continue;
      }

      if (pool.isNew(xxx, yyy)) {
        [x, y] = [xxx, yyy];
        break;
      }
    }
    return [x, y];
  }
}

class ProblemAdd34 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getAny();
    for (let i = 0; i < 20; ++i) {
      let xx = d(0, 9) * 10;
      let yy = d(0, 9) * 10;
      let xxx = d(1, 9) * 100 + xx + x;
      let yyy = d(1, 9) * 100 + yy + y;

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
        [x, y] = [xxx, yyy];
        break;
      }
    }
    return [x, y];
  }
}

class ProblemAdd37 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getAdd1p5();
    for (let i = 0; i < 20; ++i) {
      let xx = d(0, 9) * 10;
      let yy = d(0, 9) * 10;
      let xxx = d(1, 9) * 100 + xx + x;
      let yyy = d(1, 9) * 100 + yy + y;

      if (xx + yy < 100) {
        continue;
      }
      if (xxx + yyy < 1000) {
        continue;
      }

      if (pool.isNew(xxx, yyy)) {
        [x, y] = [xxx, yyy];
        break;
      }
    }
    return [x, y];
  }
}

class ProblemAdd4 extends Problem {
  generate(pool: Pool): [number, number] {
    let [x, y] = pool.getAny();
    for (let i = 0; i < 20; ++i) {
      let xxxx = Math.floor(Math.random() * 1000) * 10 + x;
      let yyyy = Math.floor(Math.random() * 1000) * 10 + y;
      if (xxxx + yyyy > 10000 || xxxx + yyyy < 1000) {
        continue;
      }

      if (pool.isNew(xxxx, yyyy)) {
        [x, y] = [xxxx, yyyy];
        break;
      }
    }
    return [x, y];
  }
}
function selectAddLevel(level: number): new () => Problem {
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

export function selectAdd(level: [number, number], count: number): string[] {
  return selectRaw(selectAddLevel, level[0], level[1], count).map(
    (values: [number, number]) => values.join(' + ') + ' ='
  );
}

export function selectSubtract(level: [number, number], count: number): string[] {
  return selectRaw(selectAddLevel, level[0], level[1], count).map(
    (values: [number, number]) => `${values[0] + values[1]} - ${values[0]} = `
  );
}
