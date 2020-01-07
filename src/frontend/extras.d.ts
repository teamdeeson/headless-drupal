declare module '@reach/router/lib/utils' {
  interface RouteMatch<T> {
    route: T;
    params: RouteParams;
    uri: string;
  }

  interface RouteParams {
    [key: string]: string;
  }

  function pick<T>(routes: T[], uri: string): RouteMatch<T> | undefined;
}

declare module '*.ico' {
  const value: string;
  export default value;
}

// eslint-disable-next-line @typescript-eslint/camelcase
declare function __non_webpack_require__(path: string): any;

declare module 'whatwg-fetch';
