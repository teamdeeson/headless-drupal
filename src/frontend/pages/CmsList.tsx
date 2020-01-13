import React from 'react';
import { Link } from '@reach/router';
import { useInitialProps } from '../useInitialProps';
import { Api, Article, JsonAPIDocument } from '../api/interface';
import { Routable } from '../Routable';

function getInitialProps(api: Api): Promise<JsonAPIDocument<Article[]>> {
  return api.listArticles();
}

const CmsPage: Routable<{}> = () => {
  const articles = useInitialProps(api => getInitialProps(api), []);

  return (
    <ul>
      {articles &&
        articles.data.map(a => (
          <li key={a.id}>
            <pre style={{ display: 'inline' }}>{a.id}</pre> <Link to={a.attributes.path}>{a.attributes.title}</Link>
          </li>
        ))}
    </ul>
  );
};

CmsPage.getInitialProps = getInitialProps;

export default CmsPage;
