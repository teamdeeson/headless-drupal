import { RouteComponentProps } from '@reach/router';
import { ReactElement } from 'react';
import { Api } from './api/interface';

export type Routable<Params = {}, Props = {}> = {
  (props: Params & RouteComponentProps): ReactElement;
  getInitialProps?(api: Api, params: Params | RouteComponentProps): Promise<Props>;
};
