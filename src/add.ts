import {d, Pool, Problem} from './problem';

class ProblemAdd1 extends Problem {
  addCount(): boolean {
    if (this.count >= 20) {
      return false;
    }
    ++this.count;
    return true;
  }
  generate(pool: Pool): string {
    let [x, y] = pool.getAdd1();
    let result = `${x} + ${y}`;
    pool.exists(result);
    return result;
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
  generate(pool: Pool): string {
    let [x, y] = pool.getAdd1p5();
    let result = `${x} + ${y}`;
    pool.exists(result);
    return result;
  }
}

class ProblemAdd2p0 extends Problem {
  generate(pool: Pool): string {
    let [x, y] = pool.getAdd1();
    let result = `${x} + ${y}`;
    pool.exists(result);
    return result;
  }
}

class ProblemAdd2 extends Problem {
  generate(pool: Pool): string {
    let [x, y] = pool.get09();
    let xx = d(1, 9);
    let yy = d(1, 9);
    if (x + y + (xx + yy) * 10 > 99) {
      if (xx > 1) {
        --xx;
      } else {
        --yy;
      }
    }
    if (Math.random() > 0.5) {
      [xx, yy] = [yy, xx];
    }
    let result = `${xx}${x} + ${yy}${y}`;
    pool.exists(result);
    return result;
  }
}
