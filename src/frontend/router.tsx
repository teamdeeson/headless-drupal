import { RouteComponentProps, Router as ReachRouter } from '@reach/router';
import React, { FC, ReactNode, ReactElement } from 'react';
import ViewArrangement from './pages/view-arrangement';
import WhatsOn from './pages/whats-on';
import CmsList from './pages/cms-list';
import CmsPage from './pages/cms-page';
import { Routable } from './Routable';

interface TopLevelRoute {
  path: string;
  component: Routable<any, any>;
}

// TODO code splitting: https://github.com/gregberge/loadable-components
export const topLevelRoutes: TopLevelRoute[] = [
  { path: 'whats-on', component: WhatsOn },
  { path: 'whats-on/:eventId', component: ViewArrangement },
  { path: 'tutorials', component: CmsList },
  { path: 'tutorials/:id', component: CmsPage },
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
