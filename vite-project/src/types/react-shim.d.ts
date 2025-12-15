// Minimal React type shims to allow editing and type checking without installed @types/react
// This is a temporary shim for development when node_modules may not be installed.

declare module 'react' {
  const React: any
  export default React
  export const useState: any
  export const useEffect: any
  export const useRef: any
  export type ReactNode = any
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any
  export function jsxs(type: any, props?: any, key?: any): any
  export function jsxDEV(type: any, props?: any, key?: any): any
}

declare namespace JSX {
  interface IntrinsicAttributes {
    [key: string]: any
  }
  interface IntrinsicElements {
    [key: string]: any
  }
}
