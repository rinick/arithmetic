let isEN: boolean = false;
export function initLan() {
  if (window.location.hash === '#zh') {
    isEN = false;
  } else if (window.location.hash === '#en') {
    isEN = true;
  } else if (window.navigator.language?.startsWith('zh')) {
    isEN = false;
  } else if (window.navigator.languages) {
    let hasZh = false;
    let hasOther = false;
    for (let str of window.navigator.languages) {
      if (str.startsWith('zh')) {
        hasZh = true;
      } else if (!str.startsWith('en')) {
        hasOther = true;
      }
    }
    if (hasZh && !hasOther) {
      isEN = false;
    }
  } else{
    isEN = true
  }

  if (isEN) {
    document.querySelector('h2').innerText = 'Arithmetic';
  }
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
