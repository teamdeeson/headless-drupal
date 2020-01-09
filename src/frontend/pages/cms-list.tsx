import React from 'react';
import { Link } from '@reach/router';
import { useInitialProps } from '../initial-props';
import { Api, Tutorial } from '../api/interface';
import { Routable } from '../Routable';

function getInitialProps(api: Api): Promise<Tutorial[]> {
  return api.listArticles();
}

const CmsPage: Routable<{}> = () => {
  const articles = useInitialProps(api => getInitialProps(api));

  return (
    <ul>
      {articles &&
        articles.map(a => (
          <li key={a.id}>
            <pre style={{ display: 'inline' }}>{a.id}</pre> <Link to={a.id}>{a.attributes.title}</Link>
          </li>
        ))}
    </ul>
  );
};

CmsPage.getInitialProps = getInitialProps;

export default CmsPage;
