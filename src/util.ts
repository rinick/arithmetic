let isEN: boolean = true;
export function setLan(lan: 'en' | 'zh') {
  isEN = lan === 'en';
}

export function t(en: string, zh: string): string {
  return isEN ? en : zh;
}
