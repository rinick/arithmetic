import React, {ChangeEvent, ReactElement} from 'react';
import {d, PairPool, selectRaw} from './problem';
import {selectAddRaw} from './add';
import './mathml';
import './mathml.less';

function gcd(a: number, b: number) {
  if (a > b) {
    [a, b] = [b, a];
  }
  if (!(a > 0)) {
    return a;
  }
  let c = b % a;
  while (c != 0) {
    [a, b, c] = [c, a, a % c];
  }
  return a;
}
console.log(gcd(17, 20));
function buildFracSimple(a: number, b: number) {
  return (
    <mfrac>
      <mn>{a}</mn>
      <mn>{b}</mn>
    </mfrac>
  );
}
function buildFracAuto(a: number, b: number) {
  if (a % b === 0) {
    return <mn>{a / b}</mn>;
  }
  let g = gcd(a, b);
  console.log(a, b, g);
  if (a > b) {
    let m = a % b;

    return (
      <>
        <mn>{(a - m) / b}</mn>
        {buildFracSimple(m / g, b / g)}
      </>
    );
  }
  return buildFracSimple(a / g, b / g);
}

function selectFraction1(count: number): React.ReactChild[] {
  let adds = selectAddRaw([1, 1], count);
  return adds.map((values: [number, number]) => {
    let numbers = [...values, values[0] + values[1]];
    let base = Math.ceil(numbers[2] * (Math.random() + 0.5));
    for (let plus = 1; gcd(numbers[2], base) > 1; ++plus) {
      base = Math.ceil((numbers[2] + plus) * (Math.random() + 0.5));
    }

    return (
      <math>
        {buildFracSimple(values[0], base)}
        <mo>+</mo>
        {buildFracSimple(values[1], base)}
        <mo>=</mo>
      </math>
    );
  });
}

function maybe1(n: number) {
  if (Math.random() > 0.5) {
    return 1;
  }
  return n;
}
function selectFraction2(count: number, maxAB: number, maxC: number, intPart: number = 1): React.ReactChild[] {
  let pool = new PairPool();

  let result: React.ReactChild[] = [];
  for (let i = 0; i < count; ++i) {
    let a = d(2, maxAB);
    let b = d(2, maxAB);
    let c = maxC;
    if (maxC > 2) {
      c = d(2, maxC);
    }
    if (b === c) {
      --i;
      continue;
    }

    let ab = a * b;
    let ac = a * c;
    let bb = Math.floor(Math.random() * maybe1(intPart) * ab) + 1;
    let cc = Math.floor(Math.random() * maybe1(intPart) * ac) + 1;
    if (gcd(bb, ab) > 1) {
      i -= 1;
      continue;
    }
    if (bb % ab === 0) {
      bb = bb >> 1;
    }
    if (cc % ac === 0) {
      cc = cc >> 1;
    }

    let pollB = bb / ab;
    let pollC = cc / ac;
    if (!pool.isNew(pollB, pollC)) {
      i -= 0.9;
      continue;
    }

    if (Math.random() < 0.5) {
      [ab, bb, ac, cc] = [ac, cc, ab, bb];
    }

    result.push(
      <math>
        {buildFracAuto(bb, ab)}
        <mo>+</mo>
        {buildFracAuto(cc, ac)}
        <mo>=</mo>
      </math>
    );
  }
  return result;
}

export function selectFraction(level: number, count: number): React.ReactChild[] {
  switch (level) {
    case 1:
      return selectFraction1(count);
    case 2:
      return selectFraction2(count, 7, 1);
    case 3:
      return selectFraction2(count, 8, 6, 1);
    case 4:
      return selectFraction2(count, 9, 9, 9);
  }
  return [];
}
