import {shuffle} from './util';

// 0 need divide, 1 need multiply, 2 add minus only
const all: number[][][] = [[], [], [], []];

let orders211: number[][] = [
  [0, 1, 2, 3],
  [2, 0, 1, 3],
  [3, 0, 1, 2],
  [1, 3, 0, 2],
  [2, 3, 0, 1],
  [0, 2, 3, 1],
  [1, 2, 3, 0],
  [3, 1, 2, 0],
  [1, 2, 0, 3],
  [2, 3, 1, 0],
  [0, 3, 2, 1],
  [0, 1, 3, 2],
];

let orders22: number[][] = [
  [0, 1, 2, 3],
  [0, 2, 1, 3],
  [0, 3, 1, 2],
];

const tested = new Set<string>();

function check(n: number[]) {
  let k = -1; // 0 divide, 1 multiple, 2 plus minus
  let count = 0;
  for (let o of orders211) {
    let sortedN = o.map((a) => n[a]);
    let key = sortedN.join();
    if (tested.has(key)) {
      continue;
    }
    tested.add(key);
    let [t1, count1] = check211(sortedN);
    if (t1 > k) {
      k = t1;
    }
    count += count1;
  }
  for (let o of orders22) {
    let sortedN = o.map((a) => n[a]);
    let [t2, count2] = check22(sortedN);
    if (t2 > k) {
      k = t2;
    }
    count += count2;
  }

  if (k >= 0) {
    if (k == 2) {
      all[0].push(n);
    }
    if (k <= 1 && n[3] <= 10) {
      all[1].push(n);
    } else if (n[3] <= 13) {
      all[2].push(n);
    } else {
      all[3].push(n);
    }
    return true;
  }
  return false;
}

const op = [
  (a: number, b: number) => a + b,
  (a: number, b: number) => a - b,
  (a: number, b: number) => b - a,
  (a: number, b: number) => a * b,
  (a: number, b: number) => a / b,
  (a: number, b: number) => b / a,
];
const op2k = [2, 2, 2, 1, 0, 0];

function check211(n: number[]): [number, number] {
  let k = -1;
  let count = 0;
  for (let i0 = 0; i0 < 6; ++i0) {
    let r0 = op[i0](n[0], n[1]);
    for (let i1 = 0; i1 < 6; ++i1) {
      let r1 = op[i1](r0, n[2]);
      for (let i2 = 0; i2 < 6; ++i2) {
        let r2 = op[i2](r1, n[3]);
        if (Math.round(r2 * 10000) === 240000) {
          let t = op2k[Math.max(i0, i1, i2)];
          ++count;
          if (t > k) {
            k = t;
          }
        }
      }
    }
  }
  return [k, count];
}
function check22(n: number[]): [number, number] {
  let k = -1;
  let count = 0;
  for (let i0 = 0; i0 < 6; ++i0) {
    let r0 = op[i0](n[0], n[1]);
    for (let i1 = 0; i1 < 6; ++i1) {
      let r1 = op[i1](n[2], n[3]);
      for (let i2 = 0; i2 < 6; ++i2) {
        let r2 = op[i2](r0, r1);
        if (Math.round(r2 * 10000) === 240000) {
          let t = op2k[Math.max(i0, i1, i2)];
          ++count;
          if (t > k) {
            k = t;
          }
        }
      }
    }
  }
  return [k, count];
}

function initData() {
  for (let a = 1; a <= 20; ++a)
    for (let b = a; b <= 20; ++b)
      for (let c = b; c <= 20; ++c)
        for (let d = c; d <= 20; ++d) {
          check([a, b, c, d]);
        }
}

initData();

export function select24(level: number, count: number) {
  let source: number[][];
  switch (level) {
    case 1:
      source = [...all[0]];
      break;
    case 2:
      source = [...all[1]];
      break;
    case 3:
      source = [...all[1], ...all[2]];
      break;
    default:
      source = [...all[1], ...all[2], ...all[3]];
  }
  source = shuffle(source);
  if (count < source.length) {
    source = source.slice(0, count);
  }
  return source.map((n) => n.join(', ') + ' => 24');
}
