import { Link } from '@reach/router';
import React from 'react';
import { Api, Arrangement } from '../api/interface';
import { useInitialProps } from '../initial-props';
import { Routable } from '../Routable';

interface Params {
  eventId: string;
}

function getInitialProps(api: Api, { eventId }: Params): Promise<Arrangement> {
  return api.loadArrangement(eventId);
}

const ViewArrangement: Routable<Params, Arrangement> = ({ eventId }: Params) => {
  const a = useInitialProps(api => getInitialProps(api, { eventId }));

  return (
    <>
      <h1>View an arrangement</h1>
      <p>This will be the event with ID: {(a && a.id) || 'loading...'}</p>
      <Link to="../">Back to what&apos;s on</Link>
    </>
  );
};

ViewArrangement.getInitialProps = getInitialProps;

export default ViewArrangement;
