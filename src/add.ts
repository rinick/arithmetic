import {d, Pool, Problem} from './problem';
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
    let result = `${x}+${y}`;
    pool.isNew(result);
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
      let result = `${x}+${y}`;
      if (pool.isNew(result)) {
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

      let result = `${xx}+${yy}`;
      if (pool.isNew(result)) {
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

      let result = `${xx}+${yy}`;
      if (pool.isNew(result)) {
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

      let result = `${xx}+${yy}`;
      if (pool.isNew(result)) {
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

      let result = `${xx}+${yy}`;
      if (pool.isNew(result)) {
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

      let result = `${xxx}+${yyy}`;
      if (pool.isNew(result)) {
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
      let result = `${xxx}+${yyy}`;
      if (pool.isNew(result)) {
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

      let result = `${xxx}+${yyy}`;
      if (pool.isNew(result)) {
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
      if (xxxx + yyyy > 10000) {
        continue;
      }

      let result = `${xxxx}+${yyyy}`;
      if (pool.isNew(result)) {
        [x, y] = [xxxx, yyyy];
        break;
      }
    }
    return [x, y];
  }
}
function selectLevel(level: number): new () => Problem {
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
export function selectAddRaw(minLevel: number, maxLevel: number, count: number): [number, number][] {
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
    console.log(maxLevel);
    console.log([...levels.keys()].sort());
    levels = new Map(shuffle([...levels]).slice(0, count));
    console.log([...levels.keys()].sort());
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

export function selectAdd(level: [number, number], count: number): string[] {
  return selectAddRaw(level[0], level[1], count).map((values: [number, number]) => values.join(' + ') + ' =');
}
