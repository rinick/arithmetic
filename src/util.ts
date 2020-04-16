let isEN: boolean = true;
export function setLan(lan: 'en' | 'zh') {
  isEN = lan === 'en';
}

export function t(en: string, zh: string): string {
  return isEN ? en : zh;
}

export function shuffle(arr: any[]) {
  let result = [...arr];
  for (let i = 0; i < result.length; ++i) {
    let j = Math.floor(Math.random() * result.length);
    if (i !== j) {
      [result[i], result[j]] = [result[j], result[i]];
    }
  }
  return result;
}
