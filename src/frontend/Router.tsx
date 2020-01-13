import { RouteComponentProps, Router as ReachRouter } from '@reach/router';
import React, { FC, ReactNode, ReactElement } from 'react';
import CmsList from './pages/CmsList';
import BasicPage from './pages/BasicPage';
import Home from './pages/Home';
import { Routable } from './Routable';

interface TopLevelRoute {
  path: string;
  // TODO parent for routable that doesn't need a generic but can be used here.
  component: Routable<any, any>;
}

// TODO code splitting: https://github.com/gregberge/loadable-components
export const topLevelRoutes: TopLevelRoute[] = [
  { path: '/', component: Home },
  { path: '*', component: BasicPage },
  { path: 'articles', component: CmsList },
];

const Router: FC = () => (
  <>
    <ReachRouter>
      <Main path="/">
        {topLevelRoutes.map(({ path, component: Component }) => (
          <Component key={path} path={path} />
        ))}
      </Main>
    </ReachRouter>
  </>
);
const Main = ({ children }: RouteComponentProps<{ children: ReactNode }>): ReactElement => {
  return <main>{children}</main>;
};

export default Router;
