import { globalHistory } from '@reach/router';
import React from 'react';
import { hydrate } from 'react-dom';
import api from './api/client';
import './base.css';
import { apiContext } from './useInitialProps';
import Router from './Router';

declare const initialPageState: unknown;

const polyfills = [];

if (!('fetch' in window)) {
  polyfills.push(import('whatwg-fetch'));
}

function run(): void {
  // globalHistory will read this if the user navigates back.
  window.history.replaceState({ initialProps: initialPageState }, '');
  // we can't replace state before it initialises though so the first time
  // we have to update the global value ourselves.
  globalHistory.location.state = { initialProps: initialPageState };

  hydrate(
    <apiContext.Provider value={api}>
      <Router />
    </apiContext.Provider>,
    document.getElementById('root')
  );
}

Promise.all(polyfills).then(run);
