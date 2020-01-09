import { createContext, useState, useContext, useEffect } from 'react';
import { globalHistory } from '@reach/router';
import { Api } from './api/interface';

export const apiContext = createContext((undefined as unknown) as Api);

export function useApi(): Api {
  return useContext(apiContext);
}

// TODO should we also write back to globalhistory.state for each page change and effectively create our own BFCache?
export function useInitialProps<T>(getInitialProps: (api: Api) => Promise<T>, deps: any[]): T | false {
  const preload = globalHistory.location.state && globalHistory.location.state.initialProps;
  const [initialProps, setInitialProps] = useState(preload);
  const api = useApi();

  useEffect(() => {
    if (!preload) {
      getInitialProps(api).then(setInitialProps);
    }
  }, deps);

  return initialProps || false;
}
