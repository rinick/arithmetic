declare module 'lodash/debounce' {
  interface Debounce {
    (): void;
    cancel(): void;
  }
  export default function debounce(func: Function, wait: number, options?: any): Debounce;
}

