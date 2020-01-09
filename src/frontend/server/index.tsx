import { globalHistory, ServerLocation } from '@reach/router';
import { pick } from '@reach/router/lib/utils';
import express from 'express';
import helmet from 'helmet';
import ms from 'ms';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Api } from '../api/interface';
import api from '../api/server';
import { apiContext } from '../useInitialProps';
import Router, { topLevelRoutes } from '../Router';
import template from './template';

const MAX_AGE_STATIC = ms('2h');
const MAX_AGE_CONTENT = ms('30m');
const app = express();

app.use(helmet());

app.use(
  '/dist',
  express.static('dist', {
    fallthrough: false,
    maxAge: process.env.NODE_ENV === 'development' ? 0 : MAX_AGE_STATIC,
  })
);

app.use((req, res, next) => {
  res.set('Cache-Control', `public, max-age=${process.env.NODE_ENV === 'development' ? 0 : MAX_AGE_CONTENT / 1000}`);
  next();
});
app.get('/favicon.ico', (req, res) => res.status(404).send('Not found'));

app.use(express.json());

app.post('/api/function/:function', (req, res, next) => {
  const f = req.params.function as keyof Api;

  if (!(f in api && typeof api[f] === 'function')) {
    res.status(400).send({ error: `Invalid function name: ${req.params.function}` });
    return;
  }

  if (!Array.isArray(req.body)) {
    res.status(400).send({ error: `Invalid parameter array` });
    return;
  }

  res.set('Content-Type', 'application/json');

  (api[f] as any)(...req.body)
    .then((r: string) => res.send(r))
    .catch(next);
});

app.get('/*', (req, res, next) => {
  const route = pick(topLevelRoutes, req.url);

  const propsPromise =
    route && route.route.component.getInitialProps
      ? route.route.component.getInitialProps(api, route.params)
      : Promise.resolve({});

  propsPromise
    .then(initialProps => {
      globalHistory.location.state = { initialProps };
      res.send(
        template({
          body: ReactDOMServer.renderToString(
            <apiContext.Provider value={api}>
              <ServerLocation url={req.url}>
                <Router />
              </ServerLocation>
            </apiContext.Provider>
          ),
          jsState: initialProps,
        })
      );
    })
    .catch(next);
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log(`Example app listening http://localhost:3000/`));
