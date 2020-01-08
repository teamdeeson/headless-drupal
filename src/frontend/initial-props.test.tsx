import { globalHistory } from '@reach/router';
import { renderHook } from '@testing-library/react-hooks';
import React, { FC, ReactNode } from 'react';
import { Api } from './api/interface';
import { apiContext, useInitialProps } from './initial-props';

type MockApi = Partial<Api> & {
  apiCall(): Promise<'done'>;
};

const mockApi: MockApi = {
  apiCall() {
    return Promise.resolve('done');
  },
};

function getInitialProps(api: Api): Promise<'done'> {
  return api.apiCall();
}

test('pre-rendered props', () => {
  mockApi.apiCall().then(initialPageState => {
    globalHistory.location.state = { initialProps: initialPageState };
    const { result } = renderHook(() => useInitialProps(getInitialProps));
    expect(result.current).toBe('done');
  });
});

test('loading initial props', () => {
  const wrapper: FC = ({ children }: { children?: ReactNode }) => (
    <apiContext.Provider value={mockApi as Api}>{children}</apiContext.Provider>
  );

  const { result, waitForNextUpdate } = renderHook(() => useInitialProps(getInitialProps), { wrapper });

  expect(result.current).toBe(false);

  return waitForNextUpdate().then(() => {
    expect(result.current).toBe('done');
  });
});