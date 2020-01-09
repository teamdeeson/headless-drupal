import { RouteComponentProps, Router as ReachRouter } from '@reach/router';
import React, { FC, ReactNode, ReactElement } from 'react';
import CmsList from './pages/cms-list';
import BasicPage from './pages/BasicPage';
import Home from './pages/Home';
import { Routable } from './Routable';

interface TopLevelRoute {
  path: string;
  component: Routable<any, any>;
}

// TODO code splitting: https://github.com/gregberge/loadable-components
export const topLevelRoutes: TopLevelRoute[] = [
  { path: '/', component: Home },
  { path: '*', component: BasicPage },
];

const Router: FC = () => (
  <>
    <ReachRouter>
      <Main path="/">
        {topLevelRoutes.map(({ path, component: Component }) => (
          <Component key={path} path={path} />
        ))}
        <NotFound default />
      </Main>
    </ReachRouter>
  </>
);
const Main = ({ children }: RouteComponentProps<{ children: ReactNode }>): ReactElement => {
  return <main>{children}</main>;
};

const NotFound: FC<RouteComponentProps> = () => {
  return <h1>404 Not found.</h1>;
};

export default Router;
