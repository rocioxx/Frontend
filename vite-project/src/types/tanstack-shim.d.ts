
declare module '@tanstack/react-store' {
  export function useStore<T = any, R = any>(store: any, selector: (s: T) => R): R
  export function createStore<T = any>(initial: T): any
  export interface Store<T = any> {
    getState(): T
    setState(updater: (s: T) => T): void
    subscribe(cb: () => void): () => void
  }
}
